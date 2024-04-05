import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// TailwindCSS의 preflight.css 파일 경로 지정
const preflightPath = join(
  process.cwd(),
  "node_modules",
  "tailwindcss",
  "lib",
  "css",
  "preflight.css"
);

try {
  // 파일 읽기
  const data = readFileSync(preflightPath, "utf8");
  // background-image: none; 제거
  const result = data.replace(/background-image: none;/g, "");

  // 파일 저장
  writeFileSync(preflightPath, result, "utf8");
  console.log("background-image: none; has been removed from preflight.css");
} catch (err) {
  console.error("Error processing preflight.css:", err);
}
