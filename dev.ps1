$ErrorActionPreference = 'Stop'

$projectRoot = $PSScriptRoot
$portableNode = Join-Path $projectRoot '.tools\node-v24.13.0-win-x64'
$portableNpm = Join-Path $portableNode 'npm.cmd'

if (Test-Path $portableNpm) {
  $env:PATH = "$portableNode;$env:PATH"
  & $portableNpm run dev
  exit $LASTEXITCODE
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
  npm run dev
  exit $LASTEXITCODE
}

throw 'Node.js를 찾을 수 없습니다. README의 "현재 작업공간에서 실행" 안내에 따라 Node.js 24를 준비해 주세요.'
