#!/bin/bash

# 初始化关联数组用于存储不同文件后缀的行数
declare -A lines_by_extension

# 查找所有 src 文件夹内的文件，排除 node_modules 文件夹
while read -r file; do
    # 获取文件后缀
    extension="${file##*.}"

    # 计算文件行数
    lines=$(wc -l < "$file" | awk '{print $1}')

    # 累加相应文件后缀的行数
    lines_by_extension["$extension"]=$((lines_by_extension["$extension"] + lines))
done < <(find . -type d \( -name "node_modules" -prune \) -o \( -type d -name "src" -exec find {} -type f \; \))

# 输出不同文件后缀的行数统计
echo "各文件后缀的代码行数（排除 node_modules 文件夹）："
for extension in "${!lines_by_extension[@]}"; do
    echo "${extension}: ${lines_by_extension[$extension]}"
done
