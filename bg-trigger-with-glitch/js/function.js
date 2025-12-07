






document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('#contents img');//すべての img タグにlazy
    images.forEach(img => {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            img.src = dataSrc; // data-srcがあればsrcに設定 
        }
        img.setAttribute('loading', 'lazy'); // loading="lazy" を追加
    });

    try {//要素処理リスト系の初期設定等、

        $('.p-split p').each(function () {//文字分割
            const $p = $(this);

            // 改行文字を <br> に統一
            let html = $p.html().replace(/\n/g, '<br>');

            // タグ付きの塊 or <br> or 1文字 をトークン化
            // <u>〜</u>, <em>〜</em>, <strong>〜</strong> などをひとまとめに
            const tokens = html.match(/<br\s*\/?>|<[^>]+>.*?<\/[^>]+>|./gi);

            let i = 0; // カウンタ
            let d = 0.05; // ディレイ

            const spanHTML = tokens.map(token => {
                if (/^<br\s*\/?>$/i.test(token)) {
                    // 改行はそのまま
                    return '<br>';
                }
                if (/^<[^>]+>.*?<\/[^>]+>$/.test(token)) {
                    // 開始〜終了タグまでのまとまり（例 <u>to</u>）
                    const wrapped = `<span style="transition-delay:calc(var(--bgTR) + ${i * d}s)">${token}</span>`;
                    i++;
                    return wrapped;
                }
                if (/\S/.test(token)) {
                    // 通常の文字は1文字ずつラップ
                    const wrapped = `<span style="transition-delay:calc(var(--bgTR) + ${i * d}s)">${token}</span>`;
                    i++;
                    return wrapped;
                }
                return token; // 空白はそのまま
            }).join('');

            $p.html(spanHTML);
        });

    } catch (error) { console.log(error); }
    try {//その他class処理
        $('.budoux').wrapInner('<budoux-ja>');//autoPhrase(文節改行)
    } catch (error) { console.log(error); }







    try {//navigation h_nav無し　navspのみ


        // sp用($menu以下)のナビゲーション
        $(".h_nav").clone().attr("id", "navsp").removeClass().addClass("nav").wrapInner('<div class="nav_inner">').insertAfter('.h_nav');

        MENU = document.querySelector(".h_menu");
        navpc = document.querySelector(".h_nav");
        HnavA = document.querySelectorAll(".h_nav a");
        cont = document.querySelector("#contents");
        navsp = document.querySelector("#navsp");
        navul = document.querySelector("#navsp ul");
        menutoggle = document.querySelectorAll(".menu_toggle, .nav a:not(.nopointer,.drop_toggle)");
        contact = document.querySelectorAll(".h_items a");
        Dtoggle = document.querySelectorAll(".drop_toggle");
        Ghdr = document.querySelector("#global_header");
        hdr = document.querySelector('#header');
        focustrap = document.querySelector('.focus_trap');

        const btnPress = () => {
            // navpc.inert = navpc.inert === true ? false : true;
            navsp.classList.toggle("show");
            navul.classList.toggle("show");
            MENU.ariaPressed = MENU.ariaPressed === "true" ? "false" : "true";
            MENU.ariaExpanded = MENU.ariaExpanded === "true" ? "false" : "true";
            MENU.ariaLabel =
                MENU.ariaLabel === "menu open" ?
                    "menu close" :
                    "menu open";
            hdr.classList.toggle("active");
            MENU.classList.toggle("active");
        };
        // btnPress();

        HnavA.forEach((el) => {
            el.addEventListener("click", () => {
                setTimeout(() => {
                    el.blur();
                    console.log(878);
                }, 600);
            });
        });
        contact.forEach((el) => {
            el.addEventListener("click", () => {
                if (hdr.classList.contains("active")) {
                    btnPress();
                }
            });
        });
        menutoggle.forEach((el) => {
            el.addEventListener("click", () => {
                // if (innerWidth <= 1200) {
                btnPress();
                // }
            });
        });
        focustrap.addEventListener("focus", () => {
            MENU.focus();
        });
        window.onkeyup = function (event) {
            if (event.keyCode == '27' && MENU.ariaPressed === "true") {
                btnPress();
            }
        }
        // window.addEventListener("keydown", () => {
        //     if (MENU.ariaPressed === "true") {
        //         if (event.key === "Escape") {
        //             btnPress();
        //         }
        //     }
        // });

        // アコーディオン開閉 
        const dropDown = (el) => {
            parent = el.closest('li');
            target = el.closest('li').querySelector('ul');
            target.classList.toggle("show");
            el.classList.toggle("active");
            parent.ariaExpanded = parent.ariaExpanded === "true" ? "false" : "true";
            target.ariaHidden = target.ariaHidden === "false" ? "true" : "false";
            target.ariaLabel = target.ariaLabel === "open" ? "close" : "open";
        }
        // $('.drop ').each(function (i) { //add custom prop
        //     let num = $(this).find('ul li').length;
        //     let ah = $(this).find('a').outerHeight();
        //     $(this).attr('style', `--li:${num};--h:${ah}px`)
        // });
        Dtoggle.forEach((el) => {
            el.addEventListener("click", () => {
                dropDown(el);
            });
        });
    } catch (error) { console.log(error); }
});

document.addEventListener('DOMContentLoaded', function () {//IntersectionObserver >>> webStorage
    try {
        const Once = document.querySelectorAll( //一度
            ".u-rad,[class*=js-]:not([class*=js-art],[class*=js-ch],.js-letter,.js-bgFix),[class*=js-art] article>*,[class*=js-ch]>*,.js-letter,.img_outer,.H-split :is(h1,h2,h3)>span,.div-split div>*"
        );
        const observerO = new IntersectionObserver(IOonce, {
            rootMargin: "0% 0% -15% 0px",
            threshold: 0,
            // root: document.body,
        });
        function IOonce(entries) {
            entries.forEach(function (entry, i) {
                const target = entry.target;
                if (entry.isIntersecting) {
                    target.classList.add("show");
                    // if (target.hasClass('__voice')) {
                    //     setTimeout(() => {
                    //         target.setAttribute('style', 'transition-delay:0s')
                    //     }, 1200);
                    // }
                }
            });
        }
        const Toggle = document.querySelectorAll(// フェードインアウト
            ".f_main,.js-bgFix"
        );
        const observerT = new IntersectionObserver(IOtoggle, { rootMargin: "-0% 0% -50% 0px", });
        function IOtoggle(entries) {
            entries.forEach(function (entry, i) {
                const target = entry.target;
                if (entry.isIntersecting) { target.classList.add("show"); }
                else { target.classList.remove("show"); }
            });
        }

        // header trans
        const head = document.querySelectorAll(//ヘッダー変形 .trans or .init
            ".mv,.first,.title1"
        );

        const observerH = new IntersectionObserver(IOhead, { rootMargin: "-0% 0% -0% 0px", threshold: 0.8 });
        function IOhead(entries) {
            entries.forEach(function (entry, i) {
                const header = document.querySelector('#header');
                if (entry.isIntersecting) {
                    header.classList.remove('trans');
                    // header.classList.add('init');
                }
                else {
                    header.classList.add('trans');
                    // header.classList.remove('init');
                }
            });
        }


        const slide = document.querySelectorAll("[class*=_slide]");// スライド
        const observerS = new IntersectionObserver(IOslide, { rootMargin: "-0% 0% -0% 0px", threshold: 0.5 });
        function IOslide(entries) {
            entries.forEach(function (entry, i) {
                const targetID = entry.target.id;
                const target = $(`#${targetID}`);
                if (entry.isIntersecting) {
                    // console.log(target);
                    try {
                        target.find('ul,>div').slick('slickPlay');
                    } catch (e) { }
                }
                else {
                    try {
                        target.find('ul,>div').slick('slickPause');
                    } catch (e) { }
                }
            });
        }


        Once.forEach((tgt) => { observerO.observe(tgt); });
        head.forEach((tgt) => { observerH.observe(tgt); });
        Toggle.forEach((tgt) => { observerT.observe(tgt); });
        // slide.forEach((tgt) => { observerS.observe(tgt); });



    } catch (error) { console.log(error); }


});

(() => {//固定背景とグリッジエフェクト
    // GlitchCanvasクラス定義
    class GlitchCanvas {
        constructor(container) {
            this.container = container;
            this.canvas = container.querySelector('.glitch-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.sourceImage = container.querySelector('.glitch-source');
            this.imageData = null;
            this.isGlitching = false;
            this.originalImageData = null;

            this.init();
        }

        async init() {
            try {
                await this.loadImage();
                this.resizeCanvas();
                this.drawImage();
                this.originalImageData = new Uint8ClampedArray(this.imageData.data);
            } catch (error) {
                console.error('Error initializing GlitchCanvas:', error);
            }
        }

        async loadImage() {
            return new Promise((resolve) => {
                if (this.sourceImage.complete && this.sourceImage.naturalWidth > 0) {
                    resolve();
                    return;
                }
                this.sourceImage.onload = () => resolve();
                this.sourceImage.onerror = () => resolve();
            });
        }

        resizeCanvas() {
            this.canvas.width = this.sourceImage.naturalWidth;
            this.canvas.height = this.sourceImage.naturalHeight;
        }

        drawImage() {
            this.ctx.drawImage(this.sourceImage, 0, 0, this.canvas.width, this.canvas.height);
            this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        }

        start() {
            if (this.isGlitching) return;
            this.isGlitching = true;
            this.scheduleGlitch();
        }

        stop() {
            this.isGlitching = false;
        }

        scheduleGlitch() {
            if (!this.isGlitching) return;
            const delay = Math.random() * 2500 + 500;
            setTimeout(() => {
                this.applyGlitchWithTransition();
                this.scheduleGlitch();
            }, delay);
        }

        applyGlitchWithTransition() {
            if (!this.imageData || !this.originalImageData) return;
            this.imageData.data.set(this.originalImageData);
            this.applyGlitchStepByStep();
        }

        applyGlitchStepByStep() {
            const steps = Math.random() * 10 + 3;
            let currentStep = 0;

            const animate = () => {
                if (currentStep >= steps) {
                    setTimeout(() => {
                        this.imageData.data.set(this.originalImageData);
                        this.ctx.putImageData(this.imageData, 0, 0);
                    }, 200);
                    return;
                }
                const progress = currentStep / steps;
                this.applyHorizontalShiftWithProgress(progress);
                this.applyRGBShiftWithProgress(progress);
                this.applyVerticalShiftWithProgress(progress);
                this.ctx.putImageData(this.imageData, 0, 0);
                currentStep++;
                requestAnimationFrame(animate);
            };
            animate();
        }

        applyHorizontalShiftWithProgress(progress) {
            const data = this.imageData.data;
            const width = this.canvas.width;
            const height = this.canvas.height;
            const intensity = Math.sin(progress * Math.PI);
            const glitchRows = Math.floor(intensity * 5) + 1;

            for (let i = 0; i < glitchRows; i++) {
                const row = Math.floor(Math.random() * height);
                const offset = (Math.random() - 0.5) * 10 * intensity;
                this.shiftRow(data, width, height, row, offset);
            }
        }

        applyRGBShiftWithProgress(progress) {
            const data = this.imageData.data;
            const intensity = Math.sin(progress * Math.PI);
            const pattern = Math.floor(Math.random() * 3);

            const getBalancedShift = (baseShift) => {
                const direction = Math.random() < 0.5 ? 1 : -1;
                const magnitude = Math.random() * baseShift;
                return Math.floor(direction * magnitude * intensity);
            };

            switch (pattern) {
                case 0:
                    const shiftR = getBalancedShift(20);
                    const shiftG = getBalancedShift(20);
                    for (let i = 0; i < data.length; i += 4) {
                        let targetIndexR = i + shiftR * 4;
                        if (targetIndexR >= 0 && targetIndexR < data.length) {
                            data[i] = data[targetIndexR];
                        }
                        let targetIndexG = i + shiftG * 4;
                        if (targetIndexG >= 0 && targetIndexG < data.length) {
                            data[i + 1] = data[targetIndexG + 1];
                        }
                    }
                    break;
                case 1:
                    const shiftB = getBalancedShift(20);
                    const shiftG2 = getBalancedShift(20);
                    for (let i = 0; i < data.length; i += 4) {
                        let targetIndexB = i + shiftB * 4;
                        if (targetIndexB >= 0 && targetIndexB < data.length) {
                            data[i + 2] = data[targetIndexB + 2];
                        }
                        let targetIndexG2 = i + shiftG2 * 4;
                        if (targetIndexG2 >= 0 && targetIndexG2 < data.length) {
                            data[i + 1] = data[targetIndexG2 + 1];
                        }
                    }
                    break;
                case 2:
                    const shiftR2 = getBalancedShift(20);
                    const shiftB2 = getBalancedShift(20);
                    for (let i = 0; i < data.length; i += 4) {
                        let targetIndexR2 = i + shiftR2 * 4;
                        if (targetIndexR2 >= 0 && targetIndexR2 < data.length) {
                            data[i] = data[targetIndexR2];
                        }
                        let targetIndexB2 = i + shiftB2 * 4;
                        if (targetIndexB2 >= 0 && targetIndexB2 < data.length) {
                            data[i + 2] = data[targetIndexB2 + 2];
                        }
                    }
                    break;
            }
        }

        applyVerticalShiftWithProgress(progress) {
            const data = this.imageData.data;
            const width = this.canvas.width;
            const height = this.canvas.height;
            const intensity = Math.sin(progress * Math.PI);
            const glitchCols = Math.floor(intensity * 2) + 1;

            for (let i = 0; i < glitchCols; i++) {
                const col = Math.floor(Math.random() * width);
                const offset = (Math.random() - 0.5) * 100 * intensity;
                this.shiftColumn(data, width, height, col, offset);
            }
        }

        shiftRow(data, width, height, row, offset) {
            const rowStart = row * width * 4;
            const rowEnd = rowStart + width * 4;
            const rowData = data.slice(rowStart, rowEnd);
            const shiftedData = new Uint8ClampedArray(rowData.length);
            for (let i = 0; i < width; i++) {
                const sourceIndex = i * 4;
                let targetIndex = i + offset;
                if (targetIndex < 0) targetIndex += width;
                if (targetIndex >= width) targetIndex -= width;
                targetIndex *= 4;
                shiftedData[targetIndex] = rowData[sourceIndex];
                shiftedData[targetIndex + 1] = rowData[sourceIndex + 1];
                shiftedData[targetIndex + 2] = rowData[sourceIndex + 2];
                shiftedData[targetIndex + 3] = rowData[sourceIndex + 3];
            }
            for (let i = 0; i < rowData.length; i++) {
                data[rowStart + i] = shiftedData[i];
            }
        }

        shiftColumn(data, width, height, col, offset) {
            const colData = [];
            for (let row = 0; row < height; row++) {
                const index = (row * width + col) * 4;
                colData.push(data[index], data[index + 1], data[index + 2], data[index + 3]);
            }
            for (let row = 0; row < height; row++) {
                const targetRow = ((row + offset + height) % height);
                const sourceIndex = (row * width + col) * 4;
                const targetIndex = (targetRow * width + col) * 4;
                if (targetIndex >= 0 && targetIndex < data.length) {
                    data[targetIndex] = colData[row * 4];
                    data[targetIndex + 1] = colData[row * 4 + 1];
                    data[targetIndex + 2] = colData[row * 4 + 2];
                    data[targetIndex + 3] = colData[row * 4 + 3];
                }
            }
        }
    }

    // グリッチキャンバス初期化
    function initGlitchCanvas() {
        const glitchItems = document.querySelectorAll('.bgItem.__glitch');
        glitchItems.forEach((item) => {
            const img = item.querySelector('img');
            if (!img) return;
            img.classList.add('glitch-source');
            const canvas = document.createElement('canvas');
            canvas.classList.add('glitch-canvas');
            item.appendChild(canvas);
            const glitchCanvas = new GlitchCanvas(item);
            item.glitchCanvas = glitchCanvas;
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const triggers = document.querySelectorAll(".js-bgTrigger");
        const bgItems = document.querySelectorAll(".bgItem");

        
        if (triggers.length > 0) {
            triggers.forEach((trigger, index) => {
                trigger.setAttribute("data-bg-index", index);
            });
            const nav = document.createElement("nav");
            nav.className = "bgNav";
            nav.setAttribute("aria-label", "section navigation");

            triggers.forEach((trigger, index) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "navDot";
                btn.setAttribute("aria-label", `trigger section ${index + 1}`);
                btn.dataset.bgIndex = index;
                btn.addEventListener("click", () => {
                    trigger.scrollIntoView({ behavior: "smooth" });
                });
                nav.appendChild(btn);
            });
            document.body.appendChild(nav);
    
            const navDots = nav.querySelectorAll(".navDot");
    
            initGlitchCanvas();
    
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const index = entry.target.dataset.bgIndex;
                        if (entry.isIntersecting) {
                            triggers.forEach((t) => {
                                t.classList.remove("current");
                                t.removeAttribute("aria-current");
                            });
                            entry.target.classList.add("current");
                            entry.target.setAttribute("aria-current", "true");
    
                            bgItems.forEach((item, i) => {
                                const isCurrent = i === Number(index);
                                item.classList.toggle("show", isCurrent);
                                item.setAttribute("aria-hidden", isCurrent ? "false" : "true");
    
                                if (item.glitchCanvas) {
                                    if (isCurrent) {
                                        item.glitchCanvas.start();
                                    } else {
                                        item.glitchCanvas.stop();
                                    }
                                }
                            });
    
                            navDots.forEach((dot) => {
                                const isCurrent = dot.dataset.bgIndex === index;
                                dot.classList.toggle("current", isCurrent);
                                dot.setAttribute("aria-current", isCurrent ? "true" : "false");
                            });
                        }
                    });
                },
                { threshold: 0.5 }
            );
    
            triggers.forEach((trigger) => observer.observe(trigger));
        }

    });


})();
