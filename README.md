# 創作アーカイブ（GitHub Pages 用）

このリポジトリは、創作設定・キャラ紹介をまとめるための **完全静的サイト** テンプレートです。

## 編集ポイント

- トップのタイトルや説明：`index.html`
- 世界観：`world.html`
- キャラクター一覧：`/data/characters.json` にキャラを追記（名前、タグ、画像URL、詳細ページURL、更新日）
- キャラ詳細ページ：`/characters/` に HTML を増やす（`mika.html` など）
- 画像：`/assets/img/` に PNG/JPG/SVG を追加
- デザイン：`/assets/css/styles.css` を調整

## 追加方法（キャラを増やす）

1. `/characters/` に `newchar.html` を作成（`characters/character-template.html` を複製→改名→中身編集）
2. `/data/characters.json` に以下の形で1件追加：

```json
{
  "name": "キャラ名",
  "subtitle": "肩書きなど",
  "tags": ["タグ1","タグ2"],
  "image": "/assets/img/your-image.png",
  "url": "/characters/newchar.html",
  "updatedAt": "2025-08-25"
}
```

保存後、数十秒ほどで GitHub Pages に反映されます。
