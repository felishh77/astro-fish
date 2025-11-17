#!/usr/bin/env bash

# 查找所有普通文本文件
files=$(find . -type f)

for f in $files; do
	# 判断是否是文本文件，避免替换二进制内容
	if file "$f" | grep -q "text"; then
		# 先替换 Fish → Fish，再替换 fish → fish
		sed -i 's/Fish/Fish/g' "$f"
		sed -i 's/fish/fish/g' "$f"
		echo "Processed: $f"
	fi
done

echo "Done!"
