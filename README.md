# BESPIN GLOBAL MARKUP GUIDE
베스핀 글로벌 HTML, CSS, JAVASCRIPT 가이드 문서입니다.

## 작업환경
  gulp로 자동화 작업을 추가하여 효율적인 리소스 관리와 작업 속도를 향상할 수 있습니다.

  - node
  - GIT
  - gulp(file include, sass, iconfont, image sprite, autoprefixer, csscomb)
  - SASS
  
## 시작
npm install 로 관련 모듈 다운로드 후, gulp build로 로컬 작업 시작
(node가 먼저 설치 되어있어야 합니다.)

```js
// 관련 모듈 다운로드
npm install

// 로컬 작업 시작
gulp build
// => localhost:9001 로 페이지 확인

// 개발에 전달할 최종 파일 생성
gulp release
```


## HTML 관련 모듈

* 파일 인클루드([gulp-file-include]) - /sources/html/includes 파일안의 개별 파일들을 인클루드해서 작성 할 수 있습니다.

```html
@@include('./head.html', {
	"lang": "en",
	"title": "Bespin Global"
})
<body class="portal">

	<!-- 상단 영역 -->
	<!-- asset, portal, metering, monitoring 파라미터값에 따라 개별 헤더로 표시 -->
	@@include('./header.html', {"service": "portal", "sub": ""})


	<!-- 본문 영역 -->
	<main>
		<article class="contents">
			<h1 class="title"><div class="inner">Manage Permissions</div></h1>
			<div class="contents-inner">
				커텐츠 영역
			</div>
		</article>
	</main>

	<!-- 하단 영역 -->
	@@include('./footer.html')
</body>
</html>
```
[gulp-file-include]: https://www.npmjs.com/package/gulp-file-include


## CSS 관련 모듈

- CSS 작성([SASS])
  - 모든 CSS는 SASS문법에 따라 .scss 파일로 작성되어 지고 bsd.scss를 기본으로 gulp에 의해서 모든 .scss 파일들은 bsd.css로 합쳐진 후 생성됩니다.
  - /srouces/styles/scss/bsd.scss(다른 모든 scss파일들 import) ==> bsd.css

[SASS]: http://sass-lang.com/

- 스프라이트 이미지 생성([spritesmith])
  - /resources/images/sprites/*.png ==> sprites.png, sprites@2x.png 로 변환
  - 관련 css 속성들(background image url, position, size..)은 /resources/styles/scss/_sprites.scss로 생성됩니다.
``` css
// scss
.iradio { display: block; position: absolute !important; top: 0; left: 0; @include retina-sprite($sc-runchecked-group);
	&.checked { @include retina-sprite($sc-rchecked-group);
		&.disabled { @include retina-sprite($sc-rchecked-disabled-group); }
	}
}

// bsd.css 로 자동 변환 후
.iradio {position: absolute !important; top: 0; left: 0;  display: block; width: 17px; height: 17px; background-image: url(../images/sprites.png); background-position: -359px -167px; }
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { .iradio { background-image: url(../images/sprites@2x.png); background-size: 443px 458px; } }
.iradio.checked {width: 17px; height: 17px;  background-image: url(../images/sprites.png); background-position: -313px -167px; }
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { .iradio.checked { background-image: url(../images/sprites@2x.png); background-size: 443px 458px; } }
.iradio.checked.disabled {width: 17px; height: 17px;  background-image: url(../images/sprites.png); background-position: -336px -167px; }
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { .iradio.checked.disabled { background-image: url(../images/sprites@2x.png); background-size: 443px 458px; } }
```

[spritesmith]: https://github.com/Ensighten/spritesmith

* 폰트아이콘([gulp-iconfont], [gulp-iconfont-css])
[gulp-iconfont]: https://www.npmjs.com/package/gulp-iconfont
[gulp-iconfont-css]: https://www.npmjs.com/package/gulp-iconfont-css
