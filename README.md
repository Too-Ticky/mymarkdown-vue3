# MyMarkdown-Vue3

### はじめに
本サイトは、書籍「Vue.jsとFirebaseで作るミニWebサービス」(ISBN978-4-8443-9861-5)を参考にし、以下の変更を加えながら学習用に再構築したものです。

### 主な変更点
- Vue2+webpack → Vue3+Vite
- OptionsAPI → ConpositonAPI('script setup' syntax)
- Javascript → Typescript
- コンポーネント間データ連携　props/emit → pinia ('setup function' syntax)
- Firebase/Auth関連部分をコンポーサブルへ分離
- Firebase接続初期化スニペットを環境変数へ分離保管。dotenvのモードオプションで公開非公開を管理。
