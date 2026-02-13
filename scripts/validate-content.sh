#!/usr/bin/env bash

set -euo pipefail

if ! command -v rg >/dev/null 2>&1; then
  echo "[ERROR] ripgrep (rg) is required for validation."
  exit 1
fi

repo_root="$(cd -- "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

errors=0

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
  done < <(rg -o '\]\(([^)]+)\)' "$file" | sed -E 's/^\]\((.*)\)$/\1/')
done < <(rg --files -g '*.qmd' -g 'README.md')

while IFS= read -r file; do
  date_line="$(rg -m1 '^date:' "$file" || true)"
  if [ -z "$date_line" ]; then
    echo "[ERROR] Missing date in $file"
    errors=1
    continue
  fi

  if [[ ! "$date_line" =~ ^date:[[:space:]]*\"?[0-9]{4}-[0-9]{2}-[0-9]{2}\"?[[:space:]]*$ ]]; then
    echo "[ERROR] Non-ISO date format in $file -> $date_line"
    errors=1
  fi
done < <(rg --files -g 'projects/*/index.qmd' | sort)

if [ "$errors" -ne 0 ]; then
  echo "[ERROR] Content validation failed."
  exit 1
fi

echo "[OK] Content validation passed."
