# Qisong Zhang · 张启淞 — Academic Homepage

Bilingual (English / 中文) academic homepage for **Qisong Zhang (张启淞)**, CV/AIGC researcher at BUPT & China Telecom TeleAI.

- Live: <https://kamisato520.github.io>
- Built with [WowPage](https://github.com/WD7ang/WowPage), a Jekyll template adapted from [Academic Pages](https://academicpages.github.io/) (origin: [selen-suyue.github.io](https://selen-suyue.github.io/))
- License: MIT (see [LICENSE](LICENSE))

## Sections

News · Experience · Publications · Projects · Awards · Talks · CV (PDF download)

## Bilingual support

The site ships with a custom EN/中文 language toggle:

- `assets/js/lang-switch.js` — language manager (localStorage persistence, browser-language default, `data-i18n-en`/`data-i18n-zh` attribute swap)
- Paired `.lang-en` / `.lang-zh` blocks in `_pages/about.md` for rich content
- Pre-paint language script in `_includes/head/custom.html` (no flash of wrong language)

## Local preview (Docker, no local Ruby required)

```powershell
docker run --rm -p 4000:4000 -v "$($PWD.Path):/srv/jekyll" jekyll/jekyll:pages jekyll serve --force_polling
```

Then open <http://localhost:4000/>.

Build-only check:

```powershell
docker run --rm -v "$($PWD.Path):/srv/jekyll" jekyll/jekyll:pages jekyll build
```

If you have Ruby installed locally, `bundle exec jekyll serve` works as well.

## Content files

| What | Where |
| --- | --- |
| Homepage content (both languages) | `_pages/about.md` |
| Identity, author profile, social links | `_config.yml` |
| Navigation menu | `_data/navigation.yml` |
| Homepage styling | `assets/css/home.css` |
| Language toggle logic | `assets/js/lang-switch.js` |
| Images / logos / PDFs / CV | `images/`, `files/` |

## Deployment

GitHub Pages builds the `main` branch automatically (Jekyll + `github-pages` gem). No CI workflow required.
