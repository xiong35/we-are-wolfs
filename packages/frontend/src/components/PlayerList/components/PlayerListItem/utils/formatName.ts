const total = 19;

export function formatName(name: string): {
  formattedName: string;
  fontSize: string;
} {
  let len = 0;
  for (let i = 0; i < name.length; i++) {
    // 非 ascii 字符占位更多，需要俩位置
    if (name.charCodeAt(i) > 255) {
      len += 2;
    } else {
      len++;
    }
  }
  
  // 8 是一个经验值，如果名字长度超过 8，就截断
  if (len > 8) {
    let formattedName = "";
    let curLen = 0;
    for (let i = 0; i < name.length; i++) {
      if (name.charCodeAt(i) > 255) {
        curLen += 2;
      } else {
        curLen++;
      }
      // 拼接新名字，使得新名字*字符*长度不超过 5（加上“...”就刚好是 8）
      formattedName += name[i];
      if (curLen > 5) break;
    }
    return {
      formattedName: formattedName + "...",
      fontSize: "15px",
    };
  } else {
    const fontSize = ((total - len) / 10) * 14 + "px";
    return {
      fontSize,
      formattedName: name,
    };
  }
}
