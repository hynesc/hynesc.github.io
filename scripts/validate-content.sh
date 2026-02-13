#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd -- "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

errors=0
have_rg=0

if command -v rg >/dev/null 2>&1; then
  have_rg=1
else
  echo "[INFO] ripgrep (rg) not found; using find/grep fallback."
fi

list_content_files() {
  if [ "$have_rg" -eq 1 ]; then
    rg --files -g '*.qmd' -g 'README.md'
  else
    find . -type f \( -name '*.qmd' -o -name 'README.md' \) | sed 's|^\./||'
  fi
}

list_project_pages() {
  if [ "$have_rg" -eq 1 ]; then
    rg --files -g 'projects/*/index.qmd' | sort
  else
    find projects -mindepth 2 -maxdepth 2 -type f -name 'index.qmd' | sort
  fi
}

extract_link_targets() {
  local file="$1"
  if [ "$have_rg" -eq 1 ]; then
    rg -o '\]\(([^)]+)\)' "$file" | sed -E 's/^\]\((.*)\)$/\1/'
  else
    grep -oE '\]\(([^)]+)\)' "$file" | sed -E 's/^\]\((.*)\)$/\1/' || true
  fi
}

first_date_line() {
  local file="$1"
  if [ "$have_rg" -eq 1 ]; then
    rg -m1 '^date:' "$file" || true
  else
    grep -m1 '^date:' "$file" || true
  fi
}

while IFS= read -r css_file; do
  [ -z "$css_file" ] && continue
  if [ ! -f "$css_file" ]; then
    echo "[ERROR] Missing CSS file referenced in _quarto.yml: $css_file"
    errors=1
  fi
done < <(sed -n 's/^[[:space:]]*css:[[:space:]]*//p' _quarto.yml)

while IFS= read -r file; do
  while IFS= read -r target; do
    case "$target" in
      http*|mailto:*|\#*) continue
        ;;
    esac

    clean_target="${target%%#*}"
    clean_target="${clean_target%%\?*}"
    [ -z "$clean_target" ] && continue

    base_dir="$(dirname "$file")"
    if [ ! -e "$base_dir/$clean_target" ] && [ ! -e "$clean_target" ]; then
      echo "[ERROR] Broken local link in $file -> $target"
      errors=1
    fi
  done < <(extract_link_targets "$file")
done < <(list_content_files)

while IFS= read -r file; do
  date_line="$(first_date_line "$file")"
  if [ -z "$date_line" ]; then
    echo "[ERROR] Missing date in $file"
    errors=1
    continue
  fi

  if [[ ! "$date_line" =~ ^date:[[:space:]]*\"?[0-9]{4}-[0-9]{2}-[0-9]{2}\"?[[:space:]]*$ ]]; then
    echo "[ERROR] Non-ISO date format in $file -> $date_line"
    errors=1
  fi
done < <(list_project_pages)

if [ "$errors" -ne 0 ]; then
  echo "[ERROR] Content validation failed."
  exit 1
fi

echo "[OK] Content validation passed."
