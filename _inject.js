const fs = require('fs');
const path = require('path');
const dir = 'E:\\s\\growth_tmp';

const B = `
<div style="border:1px solid #e8e8e8;border-left:4px solid #c0392b;border-radius:10px;padding:16px 18px;margin:28px 0;background:#fffdf7">
<div style="font-weight:700;margin-bottom:8px">还没弄好？三档人工兜底</div>
<ul style="margin:0;padding-left:20px;font-size:15px">
<li><b>199 加急</b>｜10 分钟内出图，人工复核一遍</li>
<li><b>499 一对一</b>｜反复改到报名系统能过，被退回免费重做</li>
<li><b>999 全程陪跑</b>｜从拍照到提交成功全程跟，含 3 张备选</li>
</ul>
<p style="margin:10px 0 0;font-size:14px;color:#6b6b6b">只要自助处理，9.9 一张。私信发关键词 <b>「照片」</b>，我回你要准备什么、多久给。</p>
</div>
`;

const A = `
<div style="border:1px solid #e8e8e8;border-left:4px solid #c0392b;border-radius:10px;padding:16px 18px;margin:28px 0;background:#fffdf7">
<div style="font-weight:700;margin-bottom:8px">要人做的话，三档报价（不议价）</div>
<ul style="margin:0;padding-left:20px;font-size:15px">
<li><b>299 基础</b>｜按学校模板排版、目录页码、参考文献格式统一，24h</li>
<li><b>899 标准</b>｜基础 + 查重报告逐句解读 + 降重改写建议，48h</li>
<li><b>1,999 全程</b>｜标准 + 改到通过 + 答辩 PPT + 问题预演，到答辩</li>
</ul>
<p style="margin:10px 0 0;font-size:14px;color:#6b6b6b">私信发关键词 <b>「排版」</b>，附学校、截止时间、页数，当场报价。定金 50%。</p>
</div>
`;

const files = ['index.html','jiaozi.html','cet.html','kaoyan.html','shenhe.html','lunwen.html'];
for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('三档')) { console.log(f + ' -> already has block, skip'); continue; }
  const snippet = f === 'lunwen.html' ? A : B;
  if (!html.includes('<div class="foot">')) { console.log(f + ' -> no anchor, skip'); continue; }
  html = html.replace('<div class="foot">', snippet + '\n<div class="foot">');
  fs.writeFileSync(p, html, 'utf8');
  console.log(f + ' -> injected');
}
