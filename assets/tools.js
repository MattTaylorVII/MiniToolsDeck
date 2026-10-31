
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });

        const hashMap = {
            '#ai-prompt-gen': 'aiprompt',
            '#viral-hook': 'viralhook',
            '#word-counter': 'wordcount',
            '#headline-analyzer': 'headline',
            '#favicon-gen': 'favicongen',
            '#password-generator': 'password',
            '#qr-code-generator': 'qrcode',
            '#json-formatter': 'jsonformat',
            '#utm-builder': 'utm',
            '#image-converter': 'imgconv',
            '#image-resizer': 'imgresize',
            '#social-preview': 'oggen',
            '#og-generator': 'oggen',
            '#serp-previewer': 'serp',
            '#aspect-ratio-calculator': 'aspectratio',
            '#keyword-density': 'keyword',
            '#readability-checker': 'readability',
            '#contrast-checker': 'contrast',
            '#json-ts': 'jsonts',
            '#svg-optimizer': 'svgopt',
            '#social-hook': 'socialhook',
            '#color-palette': 'palette',
            '#ai-token-cost': 'aitoken',
            '#engagement-calc': 'engagement',
            '#meta-inspect': 'metainspect',
            '#html-minifier': 'htmlmin'
        };

        const toolRoutes = {"aiprompt": "/ai-prompt-generator/", "viralhook": "/viral-social-media-hook-generator/", "wordcount": "/smart-word-character-counter/", "headline": "/smart-headline-analyzer/", "favicongen": "/favicon-website-icon-generator/", "password": "/secure-password-generator/", "qrcode": "/smart-qr-code-generator/", "jsonformat": "/json-formatter-validator/", "utm": "/utm-campaign-link-builder/", "imgconv": "/smart-image-studio/?tool=convert", "imgresize": "/smart-image-studio/?tool=resize&aspect=1", "oggen": "/social-media-meta-tag-generator/", "serp": "/google-search-result-previewer/", "aspectratio": "/smart-image-studio/?tool=resize&aspect=1", "keyword": "/keyword-density-analyzer/", "readability": "/smart-readability-checker/", "contrast": "/color-contrast-checker/", "jsonts": "/json-to-typescript-converter/", "svgopt": "/svg-cleaner-optimizer/", "socialhook": "/social-media-post-previewer/", "palette": "/image-color-palette-extractor/", "aitoken": "/ai-api-cost-estimator/", "engagement": "/social-media-engagement-calculator/", "metainspect": "/seo-meta-tag-checker/", "htmlmin": "/smart-html-compressor/"};
        function switchTool(toolId) { if(toolRoutes[toolId]) window.location.href = toolRoutes[toolId]; }
        window.addEventListener('load', () => {
            try { if(document.getElementById('contrast-fg')) checkContrast(); } catch(e) { console.warn('Contrast initialization:',e); }
            try { if(document.getElementById('hook-avatar-dropzone')) initSocialHookAvatarDropzone(); } catch(e) { console.warn('Social avatar initialization:',e); }
            try { if(document.getElementById('tool-socialhook')) updateMultiPlatformPreview(); } catch(e) { console.warn('Social preview initialization:',e); }
        });

        function copyElementText(elementId) {
            const el = document.getElementById(elementId);
            if (!el) return;
            const text = el.innerText;
            if(text && text !== "--" && text !== "Click Generate") {
                navigator.clipboard.writeText(text);
                alert('Copied to clipboard!');
            }
        }

        let lastModalTrigger = null;
        function openModal(id) {
            const m = document.getElementById(id);
            if (!m) return;
            lastModalTrigger = document.activeElement;
            m.style.display = 'flex';
            m.querySelector('.modal-close')?.focus();
        }
        function closeModal(id) {
            const m = document.getElementById(id);
            if (!m) return;
            m.style.display = 'none';
            if (lastModalTrigger?.focus) lastModalTrigger.focus();
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                const open = [...document.querySelectorAll('.modal-overlay')].find(m => getComputedStyle(m).display !== 'none');
                if (open) closeModal(open.id);
            }
        });
        document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', e => {
            if (e.target === m) closeModal(m.id);
        }));

        // Tool Logic Functions
        function secureRandomInt(max) {
            if (!Number.isSafeInteger(max) || max < 1 || max > 256) throw new Error('Invalid random range');
            const limit = Math.floor(256 / max) * max;
            const byte = new Uint8Array(1);
            let value;
            do { window.crypto.getRandomValues(byte); value = byte[0]; } while (value >= limit);
            return value % max;
        }

        function togglePasswordMode() {
            const passphrase = document.getElementById('pwd-mode')?.value === 'passphrase';
            const lengthGroup = document.getElementById('pwd-length-group');
            const wordsGroup = document.getElementById('pwd-words-group');
            const charOptions = document.getElementById('pwd-char-options');
            const button = document.querySelector('#tool-password .btn-submit');
            if (lengthGroup) lengthGroup.hidden = passphrase;
            if (wordsGroup) wordsGroup.hidden = !passphrase;
            if (charOptions) charOptions.hidden = passphrase;
            if (button) button.textContent = passphrase ? 'Generate Passphrase' : 'Generate Password';
        }

        function genPassword() {
            const mode = document.getElementById('pwd-mode')?.value || 'password';
            if (mode === 'passphrase') {
                const result = document.getElementById('pwd-res');
                const status = document.getElementById('pwd-status');
                const strength = document.getElementById('pwd-strength');
                if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') { result.textContent = 'Secure generation unavailable'; status.textContent = 'Use an up-to-date browser over HTTPS.'; strength.textContent = 'Strength estimate unavailable'; return; }
                const words = ['amber','anchor','apricot','badger','bamboo','beacon','birch','breeze','cactus','canyon','cedar','cinder','cobalt','comet','coral','cricket','daisy','delta','dolphin','ember','falcon','fern','figment','finch','fjord','flannel','galaxy','garden','glacier','harbor','hazel','heron','honey','island','jasmine','jigsaw','juniper','kettle','kiwi','lagoon','lantern','lemon','lilac','lunar','maple','marble','meadow','meteor','minty','monarch','mosaic','nectar','nickel','ocean','olive','orbit','otter','panda','paper','pebble','pepper','phoenix','piano','planet','plum','pocket','quartz','rabbit','raven','ripple','rocket','saffron','sailor','saturn','shadow','silver','spruce','sunset','tango','thunder','timber','tulip','velvet','violet','walnut','willow','winter','yonder','zephyr'];
                const count = Math.max(4, Math.min(8, Number(document.getElementById('pwd-word-count')?.value) || 5));
                const chosen = [];
                for (let i = 0; i < count; i++) chosen.push(words[secureRandomInt(words.length)]);
                const separator = document.getElementById('pwd-word-separator')?.checked ? '-' : ' ';
                result.textContent = chosen.join(separator);
                const entropy = Math.round(count * Math.log2(words.length));
                strength.textContent = `Passphrase · approximately ${entropy} bits from word choices`;
                status.textContent = 'Passphrase generated locally. Store it in a trusted password manager.';
                return;
            }
            const result = document.getElementById('pwd-res');
            const status = document.getElementById('pwd-status');
            const strength = document.getElementById('pwd-strength');
            const len = Math.max(8, Math.min(64, parseInt(document.getElementById('pwd-length').value, 10) || 16));
            const avoid = document.getElementById('pwd-ambiguous').checked;
            const sets = [];
            if (document.getElementById('pwd-uppercase').checked) sets.push(avoid ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            if (document.getElementById('pwd-lowercase').checked) sets.push(avoid ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz');
            if (document.getElementById('pwd-numbers').checked) sets.push(avoid ? '23456789' : '0123456789');
            if (document.getElementById('pwd-symbols').checked) sets.push('!@#$%^&*()-_=+[]{};:,.?');
            if (!sets.length) {
                result.textContent = 'Choose at least one character type';
                status.textContent = 'Select uppercase, lowercase, numbers or symbols to continue.';
                strength.textContent = 'Strength estimate unavailable';
                return;
            }
            if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
                result.textContent = 'Secure generation unavailable';
                status.textContent = 'This browser does not provide a secure random generator. Try an updated browser over HTTPS.';
                strength.textContent = 'Strength estimate unavailable';
                return;
            }
            try {
                const all = sets.join('');
                const chars = sets.map(set => set[secureRandomInt(set.length)]);
                while (chars.length < len) chars.push(all[secureRandomInt(all.length)]);
                for (let i = chars.length - 1; i > 0; i--) {
                    const j = secureRandomInt(i + 1);
                    [chars[i], chars[j]] = [chars[j], chars[i]];
                }
                result.textContent = chars.join('');
                const entropy = Math.round(len * Math.log2(all.length));
                const rating = entropy >= 100 ? 'Very strong' : entropy >= 70 ? 'Strong' : entropy >= 50 ? 'Moderate' : 'Consider a longer password';
                strength.textContent = rating + ' · estimated ' + entropy + ' bits of randomness';
                status.textContent = 'Password generated. Generate another any time for a new one.';
            } catch (error) {
                result.textContent = 'Could not generate password';
                status.textContent = 'Please try again in a modern browser.';
                strength.textContent = 'Strength estimate unavailable';
            }
        }

        async function copyGeneratedPassword() {
            const el = document.getElementById('pwd-res');
            const value = el ? el.textContent.trim() : '';
            if (!value || value === 'Click Generate' || value.startsWith('Choose your') || value.startsWith('Secure generation') || value.startsWith('Could not')) {
                const status = document.getElementById('pwd-status');
                if (status) status.textContent = 'Generate a password first.';
                return;
            }
            try {
                await navigator.clipboard.writeText(value);
                const status = document.getElementById('pwd-status');
                if (status) status.textContent = 'Password copied to clipboard.';
            } catch (error) {
                const status = document.getElementById('pwd-status');
                if (status) status.textContent = 'Clipboard access was blocked. Select the password and copy it manually.';
            }
        }

        let qrLogoImage = null;
        let qrGeneratedCanvas = null;

        function updateQrTypeFields() {
            const type = document.getElementById('qr-type').value;
            const host = document.getElementById('qr-dynamic-fields');
            const fields = {
                url: '<div class="form-group"><label for="qr-input">Website URL</label><input type="url" id="qr-input" maxlength="2000" placeholder="https://example.com" oninput="updateQrCharCount()" style="width:100%;"></div>',
                text: '<div class="form-group"><label for="qr-input">Your text</label><textarea id="qr-input" rows="3" maxlength="2000" placeholder="Type a short message…" oninput="updateQrCharCount()" style="width:100%;"></textarea></div>',
                wifi: '<div class="form-group"><label for="qr-wifi-name">Wi-Fi network name (SSID)</label><input id="qr-wifi-name" maxlength="150" placeholder="Network name" style="width:100%;"></div><div class="form-group"><label for="qr-wifi-pass">Wi-Fi password</label><input id="qr-wifi-pass" maxlength="150" placeholder="Password" style="width:100%;"></div><div class="form-group"><label for="qr-wifi-security">Security</label><select id="qr-wifi-security" style="width:100%;"><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">No password</option></select></div>',
                email: '<div class="form-group"><label for="qr-email">Email address</label><input type="email" id="qr-email" placeholder="hello@example.com" style="width:100%;"></div><div class="form-group"><label for="qr-email-subject">Subject (optional)</label><input id="qr-email-subject" placeholder="Email subject" style="width:100%;"></div><div class="form-group"><label for="qr-email-body">Message (optional)</label><textarea id="qr-email-body" rows="2" placeholder="Your message" style="width:100%;"></textarea></div>',
                phone: '<div class="form-group"><label for="qr-phone">Phone number</label><input type="tel" id="qr-phone" placeholder="+27123456789" style="width:100%;"></div>',
                sms: '<div class="form-group"><label for="qr-sms-phone">Phone number</label><input type="tel" id="qr-sms-phone" placeholder="+27123456789" style="width:100%;"></div><div class="form-group"><label for="qr-sms-message">Message (optional)</label><textarea id="qr-sms-message" rows="2" placeholder="Text message" style="width:100%;"></textarea></div>'
            };
            host.innerHTML = fields[type] || fields.url;
            const count = document.getElementById('qr-char-count'); if (count) count.textContent = type === 'url' || type === 'text' ? '0 / 2,000 characters' : 'Fill in the details above';
        }

        function updateQrCharCount() {
            const input = document.getElementById('qr-input');
            const count = document.getElementById('qr-char-count');
            if (input && count) count.textContent = `${Array.from(input.value).length.toLocaleString()} / 2,000 characters`;
        }

        function getQrPayload() {
            const type = document.getElementById('qr-type').value;
            const value = id => (document.getElementById(id)?.value || '').trim();
            if (type === 'url') {
                let raw = value('qr-input');
                if (!raw) return '';
                if (!/^[a-z][a-z0-9+.-]*:/i.test(raw)) raw = 'https://' + raw;
                let parsed; try { parsed = new URL(raw); } catch (_) { throw new Error('Enter a valid website URL, such as example.com.'); }
                if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname.includes('.')) throw new Error('Use a valid http or https website address.');
                return parsed.toString();
            }
            if (type === 'text') return value('qr-input');
            if (type === 'wifi') {
                const name = value('qr-wifi-name'), pass = value('qr-wifi-pass'), security = value('qr-wifi-security');
                if (!name) throw new Error('Enter your Wi-Fi network name.');
                if (security !== 'nopass' && !pass) throw new Error('Enter your Wi-Fi password, or choose No password.');
                return `WIFI:T:${security};S:${name.replace(/[\\;,:]/g, '\\$&')};P:${(security === 'nopass' ? '' : pass).replace(/[\\;,:]/g, '\\$&')};;`;
            }
            if (type === 'email') {
                const email = value('qr-email'); if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email address.');
                return `mailto:${email}?subject=${encodeURIComponent(value('qr-email-subject'))}&body=${encodeURIComponent(value('qr-email-body'))}`;
            }
            if (type === 'phone') { const phone = value('qr-phone'); if (!phone) throw new Error('Enter a phone number.'); return `tel:${phone}`; }
            if (type === 'sms') { const phone = value('qr-sms-phone'); if (!phone) throw new Error('Enter a phone number.'); return `SMSTO:${phone}:${value('qr-sms-message')}`; }
            return value('qr-input');
        }

        function generateQRCode() {
            const box = document.getElementById('qrcode-box'), status = document.getElementById('qr-status'), downloadBtn = document.getElementById('qr-download-btn');
            let val;
            try { val = getQrPayload(); } catch (error) { status.textContent = error.message; return; }
            if (!val) { status.textContent = 'Add the details first, then generate your QR code.'; return; }
            if (Array.from(val).length > 2000) { status.textContent = 'Please shorten your content to 2,000 characters or fewer.'; return; }
            if (typeof QRCode === 'undefined') { status.textContent = 'The QR generator is still loading. Please try again in a moment.'; return; }
            const size = Number(document.getElementById('qr-size').value) || 384;
            box.innerHTML = ''; qrGeneratedCanvas = null; downloadBtn.disabled = true;
            try {
                new QRCode(box, { text: val, width: size, height: size, correctLevel: qrLogoImage ? QRCode.CorrectLevel.H : QRCode.CorrectLevel.M });
                status.textContent = 'Creating your QR code…';
                setTimeout(() => {
                    const source = box.querySelector('canvas');
                    if (!source) { status.textContent = 'Could not render the QR code. Try shorter content.'; return; }
                    const output = document.createElement('canvas'); output.width = size; output.height = size;
                    const ctx = output.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0,0,size,size); ctx.drawImage(source,0,0,size,size);
                    if (qrLogoImage) {
                        const logoSize = Math.round(size * 0.19), pad = Math.round(size * 0.025), x = (size-logoSize)/2, y = (size-logoSize)/2;
                        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(x-pad,y-pad,logoSize+pad*2,logoSize+pad*2,Math.max(4,size*.015)); ctx.fill();
                        const scale = Math.min(logoSize/qrLogoImage.naturalWidth,logoSize/qrLogoImage.naturalHeight), w=qrLogoImage.naturalWidth*scale, h=qrLogoImage.naturalHeight*scale;
                        ctx.drawImage(qrLogoImage,(size-w)/2,(size-h)/2,w,h);
                    }
                    qrGeneratedCanvas = output; box.innerHTML = ''; output.style.width = 'min(100%, 384px)'; output.style.height = 'auto'; output.style.imageRendering = 'pixelated'; output.setAttribute('role','img'); output.setAttribute('aria-label','Generated QR code'); box.appendChild(output);
                    downloadBtn.disabled = false; status.textContent = 'QR code ready. Scan it with your phone before sharing or printing.';
                }, 80);
            } catch (error) { box.innerHTML = '<span class="result-subtext">Could not generate this QR code. Try shorter content.</span>'; status.textContent = 'Generation failed. Try shortening your content.'; }
        }

        function downloadQRCode() {
            if (!qrGeneratedCanvas) { const status=document.getElementById('qr-status'); if(status) status.textContent='Generate a QR code before downloading.'; return; }
            const size = Number(document.getElementById('qr-size').value) || 384;
            const link = document.createElement('a'); link.href = qrGeneratedCanvas.toDataURL('image/png'); link.download = `minitoolsdeck-qr-${size}px.png`; document.body.appendChild(link); link.click(); link.remove();
        }

        function clearQrLogo() {
            qrLogoImage = null;
            const file = document.getElementById('qr-logo-file'); if(file) file.value='';
            document.getElementById('qr-logo-empty').hidden = false; document.getElementById('qr-logo-selected').hidden = true;
            const status = document.getElementById('qr-status'); if(status) status.textContent='Logo removed.';
        }

        function initQrLogoDropzone() {
            const zone=document.getElementById('qr-logo-dropzone'), input=document.getElementById('qr-logo-file'); if(!zone||!input) return;
            const loadFile=file=>{
                if(!file) return;
                if(!/^image\/(png|jpeg|webp)$/.test(file.type)){document.getElementById('qr-status').textContent='Choose a PNG, JPG or WebP image.';return;}
                if(file.size>5*1024*1024){document.getElementById('qr-status').textContent='Please choose a logo smaller than 5 MB.';return;}
                const reader=new FileReader(); reader.onload=()=>{const img=new Image();img.onload=()=>{qrLogoImage=img;document.getElementById('qr-logo-preview').src=reader.result;document.getElementById('qr-logo-name').textContent=file.name;document.getElementById('qr-logo-empty').hidden=true;document.getElementById('qr-logo-selected').hidden=false;document.getElementById('qr-status').textContent='Logo added. Generate your QR code to include it.';};img.onerror=()=>{document.getElementById('qr-status').textContent='Could not read that image. Try another logo.';};img.src=reader.result;};reader.readAsDataURL(file);
            };
            zone.addEventListener('click',e=>{if(!e.target.closest('button')) input.click();}); zone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click();}}); input.addEventListener('change',()=>loadFile(input.files[0]));
            ['dragenter','dragover'].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.classList.add('is-dragging');})); ['dragleave','drop'].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.classList.remove('is-dragging');})); zone.addEventListener('drop',e=>loadFile(e.dataTransfer.files[0]));
        }
        document.addEventListener('DOMContentLoaded', () => { if(document.getElementById('tool-qrcode')) initQrLogoDropzone(); if(document.getElementById('tool-password')) togglePasswordMode(); });

        function clearQRCode() {
            const type=document.getElementById('qr-type'); if(type) type.value='url'; updateQrTypeFields();
            const box=document.getElementById('qrcode-box'),status=document.getElementById('qr-status'),downloadBtn=document.getElementById('qr-download-btn');
            if(box) box.innerHTML='<span class="result-subtext" style="color:#64748b;">Your QR code will appear here.</span>';
            if(status) status.textContent=''; if(downloadBtn) downloadBtn.disabled=true; qrGeneratedCanvas=null; clearQrLogo(); if(status) status.textContent=''; updateQrCharCount();
        }

        function updateWordCount() {
            const input = document.getElementById('wordcount-input');
            if (!input) return;
            const txt = input.value || '';
            const trimmed = txt.trim();
            const words = trimmed ? (trimmed.match(/\S+/gu) || []).length : 0;
            const chars = Array.from(txt).length;
            const charsNoSpace = Array.from(txt.replace(/\s/gu, '')).length;
            const sentenceMatches = trimmed.match(/[^.!?]+(?:[.!?]+|$)/gu) || [];
            const sentences = trimmed ? Math.max(1, sentenceMatches.filter(part => part.trim()).length) : 0;
            const paragraphs = trimmed ? trimmed.split(/\n[\t ]*\n+/u).filter(part => part.trim()).length : 0;
            const average = sentences ? (words / sentences).toFixed(1) : '0';
            const readingMin = words ? Math.max(1, Math.ceil(words / 200)) : 0;
            const speakingMin = words ? Math.max(1, Math.ceil(words / 130)) : 0;
            const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
            setText('res-words', words.toLocaleString());
            setText('res-chars', chars.toLocaleString());
            setText('res-chars-nospace', charsNoSpace.toLocaleString());
            setText('res-sentences', sentences.toLocaleString());
            setText('res-paragraphs', paragraphs.toLocaleString());
            setText('res-avg-sentence', average);
            setText('res-reading', readingMin ? readingMin + (readingMin === 1 ? ' min' : ' mins') : '0 min');
            setText('res-speaking', speakingMin ? speakingMin + (speakingMin === 1 ? ' min' : ' mins') : '0 min');
            setText('wc-live-status', words ? words.toLocaleString() + ' words · updating live' : 'Live counting is on');

            const platform = document.getElementById('wc-platform');
            const limits = { x: 280, instagram: 2200, linkedin: 3000, youtube: 5000, tiktok: 2200, facebook: 63206 };
            const selected = platform ? platform.value : 'x';
            const limit = limits[selected] || 280;
            const used = chars;
            const remaining = limit - used;
            const pct = Math.min(100, limit ? (used / limit) * 100 : 0);
            setText('wc-limit-label', used.toLocaleString() + ' / ' + limit.toLocaleString() + ' characters');
            setText('wc-limit-remaining', remaining >= 0 ? remaining.toLocaleString() + ' remaining' : Math.abs(remaining).toLocaleString() + ' over limit');
            const progress = document.getElementById('wc-progress');
            const fill = document.getElementById('wc-progress-fill');
            if (progress && fill) {
                fill.style.width = pct + '%';
                progress.classList.toggle('is-over', remaining < 0);
                progress.setAttribute('aria-valuemax', String(limit));
                progress.setAttribute('aria-valuenow', String(Math.min(used, limit)));
                progress.setAttribute('aria-valuetext', remaining >= 0 ? remaining + ' characters remaining' : Math.abs(remaining) + ' characters over the guide');
            }
        }

        async function copyWordCountText() {
            const input = document.getElementById('wordcount-input');
            if (!input || !input.value) { alert('Enter some text to copy.'); return; }
            try {
                if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(input.value);
                else { input.focus(); input.select(); if (!document.execCommand('copy')) throw new Error('Copy failed'); }
                const status = document.getElementById('wc-live-status'); if (status) status.textContent = 'Text copied';
            } catch (err) { alert('Copy was not available. Select the text and copy it manually.'); }
        }

        async function copyWordCountStats() {
            const input = document.getElementById('wordcount-input');
            const txt = input ? input.value : '';
            const get = id => (document.getElementById(id)?.textContent || '0').trim();
            const stats = ['Word count: ' + get('res-words'), 'Characters: ' + get('res-chars'), 'Characters (no spaces): ' + get('res-chars-nospace'), 'Sentences: ' + get('res-sentences'), 'Paragraphs: ' + get('res-paragraphs'), 'Average words per sentence: ' + get('res-avg-sentence'), 'Estimated reading time: ' + get('res-reading'), 'Estimated speaking time: ' + get('res-speaking')].join('\n');
            try {
                if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(stats);
                else { const ta = document.createElement('textarea'); ta.value = stats; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); const ok=document.execCommand('copy'); ta.remove(); if(!ok) throw new Error('Copy failed'); }
                const status = document.getElementById('wc-live-status'); if (status) status.textContent = 'Statistics copied';
            } catch (err) { alert('Copy was not available.'); }
        }

        function downloadWordCountText() {
            const input = document.getElementById('wordcount-input');
            if (!input || !input.value) { const status = document.getElementById('wc-live-status'); if (status) status.textContent = 'Enter text before downloading.'; return; }
            const blob = new Blob([input.value], {type:'text/plain;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a'); link.href = url; link.download = 'minitoolsdeck-text.txt';
            document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
            const status = document.getElementById('wc-live-status'); if (status) status.textContent = 'Text file downloaded';
        }

        function clearWordCount() {
            const input = document.getElementById('wordcount-input');
            if (input) input.value = '';
            updateWordCount();
            if (input) input.focus();
        }

        function transformWordCountText(mode) {
            const input = document.getElementById('wordcount-input');
            if (!input || !input.value) return;
            if (mode === 'upper') input.value = input.value.toLocaleUpperCase();
            else if (mode === 'lower') input.value = input.value.toLocaleLowerCase();
            else if (mode === 'title') input.value = input.value.toLocaleLowerCase().replace(/(^|[\s\-–—])([\p{L}\p{N}])/gu, (match, prefix, letter) => prefix + letter.toLocaleUpperCase());
            updateWordCount();
        }

        let jsonToolLastOutput = '';
        function sortJSONKeys(value) {
            if (Array.isArray(value)) return value.map(sortJSONKeys);
            if (value && typeof value === 'object') {
                const sorted = {};
                Object.keys(value).sort((a, b) => a.localeCompare(b)).forEach(key => { sorted[key] = sortJSONKeys(value[key]); });
                return sorted;
            }
            return value;
        }
        function jsonToolIndent() {
            const value = document.getElementById('json-indent')?.value || '2';
            return value === 'tab' ? '\t' : Number(value);
        }
        function jsonToolStats(value) {
            const bytes = new Blob([value]).size;
            return `${value.length.toLocaleString()} characters · ${bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(2)} KB`}`;
        }
        function updateJSONInputStats() {
            const input = document.getElementById('json-input');
            const stats = document.getElementById('json-input-stats');
            if (input && stats) stats.textContent = jsonToolStats(input.value);
        }
        function setJSONOutput(value, status, isValid = false) {
            const output = document.getElementById('json-output');
            const statusEl = document.getElementById('json-status');
            const stats = document.getElementById('json-output-stats');
            output.textContent = value;
            jsonToolLastOutput = isValid ? value : '';
            statusEl.textContent = status;
            stats.textContent = isValid ? jsonToolStats(value) : (value ? 'Correct the input to produce valid output' : 'No output yet');
            document.getElementById('json-copy-btn').disabled = !isValid || !value;
            document.getElementById('json-download-btn').disabled = !isValid || !value;
        }
        function formatJSON() {
            const input = document.getElementById('json-input').value;
            if (!input.trim()) { setJSONOutput('', 'Paste JSON first.'); return; }
            try {
                let parsed = JSON.parse(input);
                if (document.getElementById('json-sort-keys').checked) parsed = sortJSONKeys(parsed);
                const formatted = JSON.stringify(parsed, null, jsonToolIndent());
                setJSONOutput(formatted, 'Valid JSON · Formatted successfully.', true);
            } catch (error) {
                setJSONOutput('', `Invalid JSON: ${error.message}`);
            }
        }
        function minifyJSON() {
            const input = document.getElementById('json-input').value;
            if (!input.trim()) { setJSONOutput('', 'Paste JSON first.'); return; }
            try {
                let parsed = JSON.parse(input);
                if (document.getElementById('json-sort-keys').checked) parsed = sortJSONKeys(parsed);
                const compact = JSON.stringify(parsed);
                setJSONOutput(compact, 'Valid JSON · Minified successfully.', true);
            } catch (error) { setJSONOutput('', `Invalid JSON: ${error.message}`); }
        }
        function loadJSONSample() {
            const sample = { project: 'MiniToolsDeck', active: true, version: 1, features: ['format', 'validate', 'minify'], settings: { privacy: 'browser-only', free: true }, usage: null };
            document.getElementById('json-input').value = JSON.stringify(sample);
            updateJSONInputStats();
            formatJSON();
        }
        function clearJSONTool() {
            document.getElementById('json-input').value = '';
            updateJSONInputStats();
            setJSONOutput('', 'Paste JSON to begin.');
            document.getElementById('json-input').focus();
        }
        async function copyJSONOutput() {
            if (!jsonToolLastOutput) return;
            await copyTextSafe(jsonToolLastOutput, document.getElementById('json-copy-btn'));
        }
        function downloadJSONOutput() {
            if (!jsonToolLastOutput) return;
            const blob = new Blob([jsonToolLastOutput], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url; link.download = 'formatted.json';
            document.body.appendChild(link); link.click(); link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        document.getElementById('json-input')?.addEventListener('input', () => {
            updateJSONInputStats();
            if (!document.getElementById('json-input').value.trim()) setJSONOutput('', 'Paste JSON to begin.');
            else document.getElementById('json-status').textContent = 'Input changed — format or minify to validate it.';
        });

        let utmLastGeneratedLink = '';
        function buildUTM() {
            const urlInput = document.getElementById('utm-url');
            const sourceInput = document.getElementById('utm-source');
            const mediumInput = document.getElementById('utm-medium');
            const status = document.getElementById('utm-status');
            let rawURL = urlInput.value.trim();
            const source = sourceInput.value.trim();
            const medium = mediumInput.value.trim();
            const output = document.getElementById('utm-res');
            const copyBtn = document.getElementById('utm-copy-btn');
            const downloadBtn = document.getElementById('utm-download-btn');
            if (!rawURL || !source || !medium) {
                status.textContent = 'Enter a destination URL, source and medium to build a consistent tracking link.';
                (!rawURL ? urlInput : !source ? sourceInput : mediumInput).focus();
                return;
            }
            if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(rawURL)) rawURL = 'https://' + rawURL;
            try {
                const urlObj = new URL(rawURL);
                if (!['http:', 'https:'].includes(urlObj.protocol) || !urlObj.hostname || urlObj.hostname.includes(' ')) throw new Error('Use a valid http or https website URL.');
                const params = [
                    ['utm_source', source],
                    ['utm_medium', medium],
                    ['utm_campaign', document.getElementById('utm-name').value.trim()],
                    ['utm_content', document.getElementById('utm-content').value.trim()],
                    ['utm_term', document.getElementById('utm-term').value.trim()],
                    ['utm_id', document.getElementById('utm-id').value.trim()]
                ];
                params.forEach(([key, value]) => {
                    if (value) urlObj.searchParams.set(key, value);
                    else if (key.startsWith('utm_')) urlObj.searchParams.delete(key);
                });
                utmLastGeneratedLink = urlObj.toString();
                output.textContent = utmLastGeneratedLink;
                copyBtn.disabled = false;
                downloadBtn.disabled = false;
                status.textContent = 'Tracking link ready. Check the destination and campaign labels before sharing.';
            } catch (err) {
                utmLastGeneratedLink = '';
                output.textContent = 'Enter a valid website URL, such as https://example.com/page.';
                copyBtn.disabled = true;
                downloadBtn.disabled = true;
                status.textContent = err && err.message ? err.message : 'Please enter a valid http or https URL.';
                urlInput.focus();
            }
        }
        async function copyUTMLink() {
            if (!utmLastGeneratedLink) return;
            const btn = document.getElementById('utm-copy-btn');
            if (typeof copyTextSafe === 'function') await copyTextSafe(utmLastGeneratedLink, btn);
            else {
                try { await navigator.clipboard.writeText(utmLastGeneratedLink); btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied'; }
                catch (err) { document.getElementById('utm-status').textContent = 'Copy was blocked by your browser. Select the link and copy it manually.'; }
            }
        }
        function downloadUTMLink() {
            if (!utmLastGeneratedLink) return;
            const blob = new Blob([utmLastGeneratedLink + '\n'], { type: 'text/plain;charset=utf-8' });
            const objectURL = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectURL; link.download = 'campaign-tracking-link.txt';
            document.body.appendChild(link); link.click(); link.remove();
            setTimeout(() => URL.revokeObjectURL(objectURL), 1000);
        }
        function resetUTMBuilder() {
            ['utm-url','utm-source','utm-medium','utm-name','utm-content','utm-term','utm-id'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
            utmLastGeneratedLink = '';
            document.getElementById('utm-res').textContent = 'Your link will appear here.';
            document.getElementById('utm-status').textContent = 'Source and medium are recommended for consistent campaign reporting.';
            document.getElementById('utm-copy-btn').disabled = true;
            document.getElementById('utm-download-btn').disabled = true;
            document.getElementById('utm-url').focus();
        }

        function generateViralHooks() {
            const topicInput = document.getElementById('hook-topic');
            const topic = topicInput.value.trim();
            const output = document.getElementById('viral-hooks-output');
            const status = document.getElementById('viral-hooks-status');
            const copyAll = document.getElementById('viral-copy-all');
            if (!topic) {
                topicInput.focus();
                status.textContent = 'Add a topic first, then generate your hooks.';
                topicInput.setAttribute('aria-invalid', 'true');
                return;
            }
            topicInput.removeAttribute('aria-invalid');
            const platform = document.getElementById('hook-platform').value;
            const framework = document.getElementById('hook-framework').value;
            const audience = document.getElementById('hook-audience').value.trim();
            const tone = document.getElementById('hook-tone').value;
            const goal = document.getElementById('hook-goal').value;
            const length = document.getElementById('hook-length').value;
            const context = document.getElementById('hook-context').value.trim();
            const cta = document.getElementById('hook-cta').value.trim();
            const audiencePhrase = audience ? ` for ${audience}` : '';
            const proofDetail = context ? ` ${context.replace(/[.!?]+$/, '')}.` : '';
            const ctaPhrase = cta ? ` ${cta.replace(/[.!?]+$/, '')}.` : '';
            const variants = {
                'Curiosity Gap': [
                    [`The part of ${topic} most people overlook${audiencePhrase}:`, 'Open loop'],
                    [`Before you try another ${topic} tip, check this first${audiencePhrase}.`, 'Useful surprise'],
                    [`One question changed how I think about ${topic}${audiencePhrase}:`, 'Curiosity']
                ],
                'Contrarian': [
                    [`Hot take: ${topic} doesn't need to be as complicated as people make it${audiencePhrase}.`, 'Contrarian'],
                    [`You may not need more ${topic} advice. You may need to stop doing this.`, 'Reframe'],
                    [`The popular approach to ${topic} isn't always the most useful one${audiencePhrase}.`, 'Challenge a norm']
                ],
                'Social Proof': [
                    [`A practical lesson about ${topic} worth sharing with anyone starting out${audiencePhrase}.`, 'Community value'],
                    [`What I would look for before trusting advice about ${topic}${audiencePhrase}:`, 'Credibility'],
                    [`A simple ${topic} checklist to compare your approach against${audiencePhrase}.`, 'Self-assessment']
                ],
                'Pain Point': [
                    [`Still struggling with ${topic}${audiencePhrase}? Start by checking this.`, 'Problem-aware'],
                    [`If ${topic} feels harder than it should, this may be the missing step${audiencePhrase}.`, 'Relatable problem'],
                    [`The frustrating part of ${topic} isn't always what you think${audiencePhrase}.`, 'Empathy']
                ],
                'Storytelling': [
                    [`I used to overcomplicate ${topic}. Here's the question that helped me simplify it${audiencePhrase}.`, 'Personal story'],
                    [`A small moment changed how I approach ${topic}${audiencePhrase}:`, 'Story opener'],
                    [`If I were starting ${topic} again today${audiencePhrase}, I'd begin here.`, 'Lessons learned']
                ],
                'Bold Claim': [
                    [`A clearer way to approach ${topic}${audiencePhrase}: focus on the next useful step, not every possible step.`, 'Direct insight'],
                    [`The most useful ${topic} improvement may be the simplest one${audiencePhrase}.`, 'Bold but measured'],
                    [`Make ${topic} easier to act on: start with this one priority${audiencePhrase}.`, 'Action-led']
                ],
                'Question': [
                    [`What's the one thing you wish you knew about ${topic}${audiencePhrase}?`, 'Invite replies'],
                    [`Are you making ${topic} harder by skipping the basics${audiencePhrase}?`, 'Self-reflection'],
                    [`If you could fix one thing about your approach to ${topic}, what would it be?`, 'Conversation starter']
                ],
                'How-To': [
                    [`A simple way to get started with ${topic}${audiencePhrase}:`, 'Practical tip'],
                    [`Try this three-step approach to ${topic}${audiencePhrase}.`, 'Step-by-step'],
                    [`Save this checklist before your next ${topic} session${audiencePhrase}.`, 'Save-worthy']
                ],
                'FOMO': [
                    [`Before your next move on ${topic}, make time for this quick check${audiencePhrase}.`, 'Timely reminder'],
                    [`Don't skip this step when working on ${topic}${audiencePhrase}.`, 'Gentle urgency'],
                    [`A quick ${topic} reminder to keep handy for the next time you need it${audiencePhrase}.`, 'Useful nudge']
                ]
            };
            let selected = (variants[framework] || variants['Curiosity Gap']).map(item => ({text:item[0], angle:item[1]}));
            const toneLead = {
                'Conversational': '', 'Bold and direct': 'Straight talk: ', 'Witty and playful': 'A friendly nudge: ',
                'Helpful and educational': 'Quick lesson: ', 'Inspiring': 'A reminder worth hearing: ',
                'Professional': 'A practical perspective: ', 'Empathetic': 'If this feels familiar, you are not alone: '
            }[tone] || '';
            const platformLead = {
                'X': '', 'LinkedIn': 'For professionals: ', 'TikTok': 'Stop scrolling for a second: ',
                'Instagram': 'Keep this in mind: ', 'Facebook': 'A thought for the community: ', 'YouTube': 'In this video: '
            }[platform] || '';
            const platformGuides = {'X':280,'LinkedIn':3000,'TikTok':2200,'Instagram':2200,'Facebook':63206,'YouTube':5000};
            const goalEnd = {
                engagement: 'What do you think?', saves: 'Save this for later.', clicks: 'Explore the next step.',
                leads: 'Find the approach that fits your needs.', views: 'Keep watching for the practical steps.', sales: 'See whether this fits your needs.'
            }[goal] || '';
            selected = selected.map((item, index) => {
                let text = item.text;
                if (length === 'short') text = text.replace(/^(Hot take: |Straight talk: |Quick lesson: |A friendly nudge: |A reminder worth hearing: |A practical perspective: |If this feels familiar, you are not alone: )/, '');
                if (length === 'long') text = text.replace(/:$/, '') + (index === 0 ? ` — here's what to consider${audiencePhrase}.` : `, starting with one practical change you can make today.`);
                else if (!/[.!?:]$/.test(text)) text += '.';
                if (index === 0 && context) text = text.replace(/[:.]$/, '') + `: ${proofDetail.trim()}`;
                if (toneLead && length !== 'short') text = toneLead + text.charAt(0).toLowerCase() + text.slice(1);
                if (platformLead && platform !== 'X' && index === 1) text = platformLead + text.charAt(0).toLowerCase() + text.slice(1);
                if (index === 2 && cta) text = text.replace(/[.!?]?$/, '') + `. ${ctaPhrase.trim()}`;
                else if (index === 2 && goalEnd && goal !== 'engagement') text = text.replace(/[.!?]?$/, '') + `. ${goalEnd}`;
                return {...item, text};
            });
            output.replaceChildren();
            selected.forEach((item, index) => {
                const card = document.createElement('article'); card.className = 'vh-hook-card';
                const head = document.createElement('div'); head.className = 'vh-hook-card-head';
                const number = document.createElement('span'); number.className = 'vh-hook-number'; number.textContent = `Hook ${index + 1}`;
                const angle = document.createElement('span'); angle.className = 'vh-hook-angle'; angle.textContent = item.angle;
                head.append(number, angle);
                const area = document.createElement('textarea'); area.className = 'vh-hook-text'; area.rows = 3; area.maxLength = 1000; area.setAttribute('aria-label', `Edit hook ${index + 1}`); area.value = item.text;
                const footer = document.createElement('div'); footer.className = 'vh-hook-footer';
                const count = document.createElement('span'); count.className = 'vh-hook-count';
                const updateHookCount = () => { const limit = platformGuides[platform] || 280; count.textContent = `${area.value.length} characters${area.value.length > limit ? ` · over ${platform} guide (${limit})` : ''}`; count.style.color = area.value.length > limit ? '#ef4444' : ''; };
                updateHookCount();
                area.addEventListener('input', updateHookCount);
                const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'copy-btn vh-hook-copy'; copy.innerHTML = '<i class="fa-regular fa-copy"></i> Copy hook';
                copy.addEventListener('click', async () => { const ok = await copyViralText(area.value); status.textContent = ok ? `Hook ${index + 1} copied.` : 'Copy was unavailable. Select the hook text and copy it manually.'; });
                footer.append(count, copy); card.append(head, area, footer); output.append(card);
            });
            copyAll.disabled = false;
            status.textContent = `Generated 3 ${platform} hook ideas using ${framework.toLowerCase()} style. Character counts are guidance, not a guarantee of platform acceptance. Edit any hook before copying.`;
        }

        async function copyViralText(text) {
            try {
                if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
                const temp = document.createElement('textarea'); temp.value = text; temp.style.position = 'fixed'; temp.style.opacity = '0'; document.body.appendChild(temp); temp.select();
                const ok = document.execCommand('copy'); temp.remove(); return ok;
            } catch (error) { return false; }
        }

        async function copyAllViralHooks() {
            const areas = Array.from(document.querySelectorAll('#viral-hooks-output .vh-hook-text'));
            if (!areas.length) return;
            const text = areas.map((area, i) => `Hook ${i + 1}\n${area.value.trim()}`).join('\n\n');
            const ok = await copyViralText(text);
            document.getElementById('viral-hooks-status').textContent = ok ? 'All three hooks copied.' : 'Copy was unavailable. Select and copy the hooks manually.';
        }

        function clearViralHooks() {
            ['hook-topic','hook-audience','hook-context','hook-cta'].forEach(id => { document.getElementById(id).value = ''; });
            document.getElementById('hook-platform').value = 'X';
            document.getElementById('hook-framework').value = 'Curiosity Gap';
            document.getElementById('hook-tone').value = 'Conversational';
            document.getElementById('hook-goal').value = 'engagement';
            document.getElementById('hook-length').value = 'medium';
            const output = document.getElementById('viral-hooks-output'); output.replaceChildren();
            const empty = document.createElement('div'); empty.className = 'vh-empty';
            const icon = document.createElement('i'); icon.className = 'fa-solid fa-bolt';
            const strong = document.createElement('strong'); strong.textContent = 'Ready when you are';
            const span = document.createElement('span'); span.textContent = 'Add a topic and generate three different opening angles. You can edit each result before copying it.';
            empty.append(icon, strong, span); output.append(empty);
            document.getElementById('viral-hooks-status').textContent = 'Your three ideas will appear here.';
            document.getElementById('viral-copy-all').disabled = true;
            document.getElementById('hook-topic').removeAttribute('aria-invalid');
        }

        function drawFaviconContained(ctx, image, size) {
            ctx.clearRect(0, 0, size, size);
            const width = image.naturalWidth || image.width;
            const height = image.naturalHeight || image.height;
            if (!width || !height) throw new Error('The selected logo has invalid dimensions.');
            const scale = Math.min(size / width, size / height);
            const drawWidth = Math.max(1, Math.round(width * scale));
            const drawHeight = Math.max(1, Math.round(height * scale));
            ctx.drawImage(image, Math.round((size - drawWidth) / 2), Math.round((size - drawHeight) / 2), drawWidth, drawHeight);
        }

        function previewFaviconSource(input) {
            const file = input && input.files && input.files[0];
            if (!file) return;
            if ((!file.type.startsWith('image/') && !/\.(png|jpe?g|webp|svg)$/i.test(file.name)) || file.size > 10 * 1024 * 1024) {
                document.getElementById('favicon-status').textContent = 'Please choose a PNG, JPG, WebP or SVG image.';
                input.value = '';
                return;
            }
            const status = document.getElementById('favicon-status');
            status.textContent = 'Loading logo…';
            const reader = new FileReader();
            reader.onerror = () => { status.textContent = 'Could not read this file. Please try another image.'; };
            reader.onload = function(e) {
                const img = new Image();
                img.onerror = () => { status.textContent = 'This image could not be opened. Please try a PNG, JPG, WebP or SVG file.'; };
                img.onload = function() {
                    try {
                        document.getElementById('favicon-preview-area').style.display = 'block';
                        document.getElementById('fav-preview-src').src = e.target.result;
                        const makePreview = (size, targetId) => {
                            const canvas = document.createElement('canvas');
                            canvas.width = size; canvas.height = size;
                            const ctx = canvas.getContext('2d');
                            if (!ctx) throw new Error('Canvas is unavailable in this browser.');
                            drawFaviconContained(ctx, img, size);
                            document.getElementById(targetId).src = canvas.toDataURL('image/png');
                        };
                        makePreview(32, 'fav-preview-32');
                        makePreview(180, 'fav-preview-180');
                        const name = document.getElementById('favicon-file-name');
                        name.textContent = file.name;
                        name.hidden = false;
                        status.textContent = 'Logo ready — download your favicon bundle when you’re ready.';
                    } catch (error) {
                        status.textContent = error.message || 'Could not preview this logo. Please try another file.';
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function initFaviconDropzone() {
            const dropzone = document.getElementById('favicon-dropzone');
            const input = document.getElementById('favicon-file');
            if (!dropzone || !input || dropzone.dataset.ready === 'true') return;
            dropzone.dataset.ready = 'true';
            dropzone.addEventListener('click', event => {
                if (!event.target.closest('input')) input.click();
            });
            dropzone.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); }
            });
            input.addEventListener('change', () => previewFaviconSource(input));
            ['dragenter', 'dragover'].forEach(type => dropzone.addEventListener(type, event => {
                event.preventDefault(); event.stopPropagation(); dropzone.classList.add('is-dragging');
            }));
            ['dragleave', 'drop'].forEach(type => dropzone.addEventListener(type, event => {
                event.preventDefault(); event.stopPropagation(); dropzone.classList.remove('is-dragging');
            }));
            dropzone.addEventListener('drop', event => {
                const file = Array.from(event.dataTransfer.files || []).find(item => item.type.startsWith('image/') || /\.(png|jpe?g|webp|svg)$/i.test(item.name));
                if (!file) { document.getElementById('favicon-status').textContent = 'Drop a supported image file: PNG, JPG, WebP or SVG.'; return; }
                const transfer = new DataTransfer(); transfer.items.add(file); input.files = transfer.files;
                previewFaviconSource(input);
            });
        }
        initFaviconDropzone();

        function generateFaviconBundle() {
            if (typeof JSZip === 'undefined') {
                alert('JSZip library is still loading. Please try again in a moment.');
                return;
            }
            const fileInput = document.getElementById('favicon-file');
            if(fileInput.files.length === 0) { document.getElementById('favicon-status').textContent = 'Add a logo first by dropping it above or browsing for a file.'; return; }
            
            document.getElementById('favicon-status').innerText = 'Generating icons...';
            
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const zip = new JSZip();
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const sizes = [
                        { name: 'favicon-16x16.png', size: 16 },
                        { name: 'favicon-32x32.png', size: 32 },
                        { name: 'favicon-48x48.png', size: 48 },
                        { name: 'apple-touch-icon.png', size: 180 },
                        { name: 'android-chrome-192x192.png', size: 192 },
                        { name: 'android-chrome-512x512.png', size: 512 }
                    ];

                    sizes.forEach(({name, size}) => {
                        canvas.width = size;
                        canvas.height = size;
                        drawFaviconContained(ctx, img, size);
                        zip.file(name, canvas.toDataURL('image/png').split(',')[1], {base64: true});
                    });

                    const snippet = `<!-- Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;

                    zip.file("html-snippet.txt", snippet);
                    document.getElementById('favicon-snippet').textContent = snippet;

                    zip.generateAsync({type:"blob"}).then(function(blob) {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = "favicon-bundle.zip";
                        document.body.appendChild(link); link.click(); link.remove();
                        setTimeout(() => URL.revokeObjectURL(link.href), 30000);
                        document.getElementById('favicon-status').innerText = 'Success! Your ZIP contains six icon sizes and the HTML snippet.';
                    });
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // Image Converter: local-only processing, multi-file queue and safe Blob downloads.
        (() => {
            const input = document.getElementById('img-conv-file');
            if (!input) return;
            const dropzone = document.getElementById('imgc-dropzone');
            const workspace = document.getElementById('imgc-workspace');
            const list = document.getElementById('imgc-file-list');
            const status = document.getElementById('img-conv-res');
            const target = document.getElementById('img-conv-target');
            const quality = document.getElementById('imgc-quality');
            const qualityValue = document.getElementById('imgc-quality-value');
            const qualityGroup = document.getElementById('imgc-quality-group');
            const backgroundGroup = document.getElementById('imgc-background-group');
            const convertButton = document.getElementById('imgc-convert');
            const zipButton = document.getElementById('imgc-download-all');
            let files = [];
            let results = [];
            let previewUrls = [];

            const formatInfo = {
                'image/png': { ext: 'png', label: 'PNG' },
                'image/jpeg': { ext: 'jpg', label: 'JPG' },
                'image/webp': { ext: 'webp', label: 'WebP' }
            };
            const formatBytes = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
            const safeBaseName = name => name.replace(/\.[^.]+$/, '').replace(/[\\/:*?"<>|]/g, '-').trim().slice(0, 120) || 'converted-image';
            function revokeResults() {
                results.forEach(item => { if (item.url) URL.revokeObjectURL(item.url); });
                results = [];
                zipButton.hidden = true;
            }
            function clearPreviews() { previewUrls.forEach(url => URL.revokeObjectURL(url)); previewUrls = []; }
            function setStatus(message) { status.textContent = message; }
            function addFiles(incoming) {
                const valid = Array.from(incoming || []).filter(file => file.type.startsWith('image/') && file.type !== 'image/svg+xml');
                const rejected = (incoming ? Array.from(incoming) : []).length - valid.length;
                if (rejected) setStatus(`${rejected} unsupported file(s) skipped. Choose raster images such as PNG, JPG, WebP, GIF or BMP.`);
                if (!valid.length) { if (!files.length) setStatus('Please choose a supported image file.'); return; }
                const seen = new Set(files.map(file => `${file.name}|${file.size}|${file.lastModified}`));
                valid.forEach(file => { const key = `${file.name}|${file.size}|${file.lastModified}`; if (!seen.has(key)) { files.push(file); seen.add(key); } });
                revokeResults(); renderFiles();
                if (!rejected) setStatus(`${files.length} image${files.length === 1 ? '' : 's'} ready. Choose a format and convert.`);
            }
            function renderFiles() {
                clearPreviews(); list.replaceChildren();
                dropzone.hidden = files.length > 0;
                workspace.hidden = files.length === 0;
                document.getElementById('imgc-file-count').textContent = `${files.length} file${files.length === 1 ? '' : 's'} selected`;
                files.forEach((file, index) => {
                    const card = document.createElement('article'); card.className = 'imgc-file-card';
                    const previewWrap = document.createElement('div'); previewWrap.className = 'imgc-preview-wrap';
                    const image = document.createElement('img'); image.alt = `Preview of ${file.name}`;
                    const url = URL.createObjectURL(file); previewUrls.push(url); image.src = url;
                    image.onerror = () => { image.remove(); previewWrap.textContent = 'Preview unavailable'; };
                    previewWrap.appendChild(image);
                    const name = document.createElement('div'); name.className = 'imgc-file-name'; name.textContent = file.name;
                    const meta = document.createElement('div'); meta.className = 'imgc-file-meta'; meta.textContent = `${formatBytes(file.size)} · ${file.type || 'Image file'}`;
                    const result = document.createElement('div'); result.className = 'imgc-file-result'; result.id = `imgc-result-${index}`;
                    card.append(previewWrap, name, meta, result); list.appendChild(card);
                });
            }
            function loadImage(file) {
                return new Promise((resolve, reject) => {
                    const url = URL.createObjectURL(file); const image = new Image();
                    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
                    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('This image could not be opened by your browser.')); };
                    image.src = url;
                });
            }
            function canvasBlob(canvas, mime, q) {
                return new Promise((resolve, reject) => {
                    try { canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Your browser could not export this format. Try PNG, JPG or WebP.')), mime, q); }
                    catch (error) { reject(error); }
                });
            }
            async function convertOne(file, mime, q, background, maxWidth, maxHeight) {
                const image = await loadImage(file);
                const originalWidth = image.naturalWidth || image.width;
                const originalHeight = image.naturalHeight || image.height;
                if (!originalWidth || !originalHeight || originalWidth * originalHeight > 100000000) throw new Error('Image dimensions are too large to process safely in this browser.');
                let scale = 1;
                if (maxWidth > 0) scale = Math.min(scale, maxWidth / originalWidth);
                if (maxHeight > 0) scale = Math.min(scale, maxHeight / originalHeight);
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(originalWidth * scale));
                canvas.height = Math.max(1, Math.round(originalHeight * scale));
                const context = canvas.getContext('2d', { alpha: mime !== 'image/jpeg' });
                if (!context) throw new Error('Canvas is unavailable in this browser.');
                if (mime === 'image/jpeg') { context.fillStyle = background; context.fillRect(0, 0, canvas.width, canvas.height); }
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                const blob = await canvasBlob(canvas, mime, q);
                canvas.width = 0; canvas.height = 0;
                if (blob.type !== mime) throw new Error(`${formatInfo[mime].label} export is not supported by this browser. Try another output format.`);
                return blob;
            }
            function downloadBlob(blob, filename) {
                const url = URL.createObjectURL(blob); const link = document.createElement('a');
                link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 30000);
            }
            input.addEventListener('change', event => { addFiles(event.target.files); input.value = ''; });
            dropzone.addEventListener('click', event => { if (!event.target.closest('input')) input.click(); });
            dropzone.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); } });
            ['dragenter', 'dragover'].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.add('is-dragging'); }));
            ['dragleave', 'drop'].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.remove('is-dragging'); }));
            dropzone.addEventListener('drop', event => addFiles(event.dataTransfer.files));
            quality.addEventListener('input', () => qualityValue.textContent = `${quality.value}%`);
            target.addEventListener('change', () => { qualityGroup.hidden = target.value === 'image/png'; backgroundGroup.hidden = target.value !== 'image/jpeg'; revokeResults(); list.querySelectorAll('.imgc-file-result').forEach(el => el.replaceChildren()); setStatus('Output settings changed. Convert again to apply them.'); });
            const invalidateResults = message => { revokeResults(); list.querySelectorAll('.imgc-file-result').forEach(el => el.replaceChildren()); if (files.length) setStatus(message); };
            quality.addEventListener('change', () => invalidateResults('Quality changed. Convert again to apply the new setting.'));
            document.getElementById('imgc-background').addEventListener('change', () => invalidateResults('Background changed. Convert again to apply the new color.'));
            ['imgc-max-width','imgc-max-height'].forEach(id => document.getElementById(id).addEventListener('change', () => {
                const w = Number(document.getElementById('imgc-max-width').value), h = Number(document.getElementById('imgc-max-height').value);
                if ((w && (w < 1 || w > 12000)) || (h && (h < 1 || h > 12000))) { setStatus('Resize limits must be between 1 and 12,000 pixels.'); return; }
                invalidateResults('Resize settings changed. Convert again to apply them.');
            }));
            document.getElementById('imgc-clear').addEventListener('click', () => { files = []; revokeResults(); clearPreviews(); renderFiles(); setStatus('Ready to convert. Your files stay on this device.'); });
            convertButton.addEventListener('click', async () => {
                if (!files.length) { setStatus('Add at least one image first.'); return; }
                revokeResults(); list.querySelectorAll('.imgc-file-result').forEach(el => el.textContent = '');
                const mime = target.value; const q = Number(quality.value) / 100; const background = document.getElementById('imgc-background').value;
                const maxWidth = Number(document.getElementById('imgc-max-width').value) || 0;
                const maxHeight = Number(document.getElementById('imgc-max-height').value) || 0;
                if ((maxWidth && (maxWidth < 1 || maxWidth > 12000)) || (maxHeight && (maxHeight < 1 || maxHeight > 12000))) { setStatus('Resize limits must be between 1 and 12,000 pixels.'); convertButton.disabled = false; convertButton.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Convert images'; return; }
                convertButton.disabled = true; convertButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Converting…';
                let success = 0; const errors = [];
                for (let i = 0; i < files.length; i++) {
                    setStatus(`Converting ${i + 1} of ${files.length}: ${files[i].name}`);
                    const resultEl = document.getElementById(`imgc-result-${i}`);
                    try {
                        const blob = await convertOne(files[i], mime, q, background, maxWidth, maxHeight);
                        const filename = `${safeBaseName(files[i].name)}.${formatInfo[mime].ext}`;
                        const url = URL.createObjectURL(blob); results.push({ blob, url, filename, originalSize: files[i].size });
                        const link = document.createElement('a'); link.href = url; link.download = filename; link.textContent = `Download · ${formatBytes(blob.size)}`;
                        const delta = files[i].size ? Math.round((1 - blob.size / files[i].size) * 100) : 0;
                        const note = document.createElement('span'); note.textContent = ` · ${delta >= 0 ? `${delta}% smaller` : `${Math.abs(delta)}% larger`}`;
                        resultEl.append(link, note); success++;
                    } catch (error) { resultEl.textContent = `Could not convert: ${error.message || 'Unknown error'}`; errors.push(files[i].name); }
                }
                zipButton.hidden = results.length < 2 || typeof JSZip === 'undefined';
                setStatus(`${success} of ${files.length} image${files.length === 1 ? '' : 's'} converted successfully.${errors.length ? ` ${errors.length} failed; see each file for details.` : ''}${success ? ' Download individual files below' + (zipButton.hidden ? '.' : ' or download them together as a ZIP.') : ''}`);
                convertButton.disabled = false; convertButton.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Convert images';
            });
            zipButton.addEventListener('click', async () => {
                if (!results.length || typeof JSZip === 'undefined') return;
                zipButton.disabled = true; zipButton.textContent = 'Preparing ZIP…';
                try { const zip = new JSZip(); results.forEach(item => zip.file(item.filename, item.blob)); const blob = await zip.generateAsync({ type: 'blob' }); downloadBlob(blob, 'minitoolsdeck-converted-images.zip'); setStatus('Your ZIP archive is ready and downloading.'); }
                catch (error) { setStatus('Could not create the ZIP. Please download each converted image individually.'); }
                finally { zipButton.disabled = false; zipButton.innerHTML = '<i class="fa-solid fa-file-zipper"></i> Download all (.ZIP)'; }
            });
        })();

        (function initImageResizer() {
            const input = document.getElementById('ir-files');
            if (!input) return;
            const drop = document.getElementById('ir-dropzone');
            const workspace = document.getElementById('ir-workspace');
            const fileList = document.getElementById('ir-file-list');
            const resultsEl = document.getElementById('ir-results');
            const status = document.getElementById('ir-status');
            const runBtn = document.getElementById('ir-run');
            const zipBtn = document.getElementById('ir-zip');
            let files = [], outputs = [], firstRatio = 1;
            const presets = {
                'instagram-square':[1080,1080], 'instagram-portrait':[1080,1350], 'instagram-story':[1080,1920],
                'youtube-thumbnail':[1280,720], 'youtube-banner':[2560,1440], 'facebook-cover':[1640,624],
                'linkedin-post':[1200,627], 'og-image':[1200,630], hd:[1920,1080], '4k':[3840,2160]
            };
            const fmtBytes = n => n < 1024 ? `${n} B` : n < 1048576 ? `${(n/1024).toFixed(1)} KB` : `${(n/1048576).toFixed(2)} MB`;
            const baseName = name => name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9_-]+/gi,'-').replace(/^-+|-+$/g,'') || 'image';
            const setStatus = msg => { status.textContent = msg; };
            function clearOutputs() { outputs.forEach(o => { if (o.url) URL.revokeObjectURL(o.url); }); outputs=[]; resultsEl.innerHTML=''; zipBtn.hidden=true; }
            function loadImage(file) { return new Promise((resolve,reject) => { const url=URL.createObjectURL(file), img=new Image(); img.onload=()=>resolve({img,url}); img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('This image could not be opened.'));}; img.src=url; }); }
            function renderFiles() {
                fileList.innerHTML=''; resultsEl.innerHTML=''; clearOutputs();
                workspace.hidden = !files.length; drop.hidden = !!files.length;
                document.getElementById('ir-count').textContent = `${files.length} image${files.length===1?'':'s'} selected`;
                files.forEach((file,i)=>{
                    const card=document.createElement('div'); card.className='imgc-file-card';
                    const wrap=document.createElement('div'); wrap.className='imgc-preview-wrap';
                    const img=document.createElement('img'); img.alt=file.name; img.src=URL.createObjectURL(file); img.onload=()=>URL.revokeObjectURL(img.src); wrap.appendChild(img);
                    const name=document.createElement('div'); name.className='imgc-file-name'; name.textContent=file.name;
                    const meta=document.createElement('div'); meta.className='imgc-file-meta'; meta.textContent=fmtBytes(file.size);
                    card.append(wrap,name,meta); fileList.appendChild(card);
                    if(i===0) loadImage(file).then(({img,url})=>{firstRatio=img.naturalWidth/img.naturalHeight||1;URL.revokeObjectURL(url);}).catch(()=>{});
                });
                setStatus(files.length ? 'Ready. Set your dimensions and resize.' : 'Ready. Choose a size and resize your images.');
            }
            function addFiles(list) {
                const accepted=Array.from(list||[]).filter(f=>f.type.startsWith('image/'));
                if(!accepted.length){setStatus('Choose a supported image file to continue.');return;}
                const total=files.length+accepted.length;
                if(total>50){setStatus('Please resize up to 50 images per batch.');return;}
                files=files.concat(accepted); renderFiles();
            }
            drop.addEventListener('click',()=>input.click());
            drop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click();}});
            input.addEventListener('change',e=>{addFiles(e.target.files);input.value='';});
            ['dragenter','dragover'].forEach(type=>drop.addEventListener(type,e=>{e.preventDefault();drop.classList.add('is-dragging');}));
            ['dragleave','drop'].forEach(type=>drop.addEventListener(type,e=>{e.preventDefault();drop.classList.remove('is-dragging');}));
            drop.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
            document.getElementById('ir-clear').addEventListener('click',()=>{files=[];renderFiles();drop.hidden=false;});
            const preset=document.getElementById('ir-preset'), width=document.getElementById('ir-width'), height=document.getElementById('ir-height');
            preset.addEventListener('change',()=>{if(presets[preset.value]){width.value=presets[preset.value][0];height.value=presets[preset.value][1];document.getElementById('ir-lock').value='no';}});
            width.addEventListener('input',()=>{if(document.getElementById('ir-lock').value==='yes' && firstRatio>0) height.value=Math.max(1,Math.round(Number(width.value)/firstRatio));});
            height.addEventListener('input',()=>{if(document.getElementById('ir-lock').value==='yes' && firstRatio>0) width.value=Math.max(1,Math.round(Number(height.value)*firstRatio));});
            document.getElementById('ir-lock').addEventListener('change',()=>{if(document.getElementById('ir-lock').value==='yes'){height.value=Math.max(1,Math.round(Number(width.value)/firstRatio));}});
            const quality=document.getElementById('ir-quality'); quality.addEventListener('input',()=>document.getElementById('ir-quality-value').textContent=quality.value+'%');
            document.getElementById('ir-format').addEventListener('change',()=>{document.getElementById('ir-quality-group').style.opacity=document.getElementById('ir-format').value==='image/png'?'.55':'1';});
            async function resizeOne(file,w,h,mode,mime,q,bg) {
                const {img,url}=await loadImage(file);
                try {
                    const canvas=document.createElement('canvas'); canvas.width=w;canvas.height=h;
                    const ctx=canvas.getContext('2d'); if(!ctx) throw new Error('Canvas is unavailable in this browser.');
                    if(mime==='image/jpeg'||mode==='contain'){ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);}
                    if(mode==='stretch') ctx.drawImage(img,0,0,w,h);
                    else if(mode==='contain') {const scale=Math.min(w/img.naturalWidth,h/img.naturalHeight);const dw=Math.round(img.naturalWidth*scale),dh=Math.round(img.naturalHeight*scale);ctx.drawImage(img,Math.round((w-dw)/2),Math.round((h-dh)/2),dw,dh);}
                    else {const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight);const sw=w/scale,sh=h/scale,sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2;ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h);}
                    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Export failed. Try another format.')),mime,mime==='image/png'?undefined:q));
                    return blob;
                } finally {URL.revokeObjectURL(url);}
            }
            runBtn.addEventListener('click',async()=>{
                if(!files.length){setStatus('Add at least one image first.');return;}
                const w=Number(width.value),h=Number(height.value);
                if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||w>12000||h>12000){setStatus('Width and height must be whole numbers between 1 and 12,000 pixels.');return;}
                if(w*h>40000000){setStatus('That canvas is very large. Choose dimensions with no more than 40 million pixels.');return;}
                clearOutputs();runBtn.disabled=true;runBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Resizing…';
                const mime=document.getElementById('ir-format').value, mode=document.getElementById('ir-mode').value, q=Number(quality.value)/100,bg=document.getElementById('ir-background').value;
                const ext={'image/webp':'webp','image/jpeg':'jpg','image/png':'png'}[mime]; let ok=0; const errors=[];
                for(let i=0;i<files.length;i++){
                    setStatus(`Resizing ${i+1} of ${files.length}: ${files[i].name}`);
                    try {const blob=await resizeOne(files[i],w,h,mode,mime,q,bg);const filename=`${baseName(files[i].name)}-${w}x${h}.${ext}`;const url=URL.createObjectURL(blob);outputs.push({blob,url,filename});
                        const card=document.createElement('div');card.className='imgc-file-card';const wrap=document.createElement('div');wrap.className='imgc-preview-wrap';const preview=document.createElement('img');preview.src=url;preview.alt=`Resized ${files[i].name}`;wrap.appendChild(preview);const name=document.createElement('div');name.className='imgc-file-name';name.textContent=filename;const meta=document.createElement('div');meta.className='imgc-file-meta';meta.textContent=`${w} × ${h} px · ${fmtBytes(blob.size)}`;const link=document.createElement('a');link.className='imgc-file-result';link.href=url;link.download=filename;link.textContent='Download image';card.append(wrap,name,meta,link);resultsEl.appendChild(card);ok++;
                    } catch(err){errors.push(`${files[i].name}: ${err.message||'failed'}`);}
                }
                zipBtn.hidden=outputs.length<2||typeof JSZip==='undefined';setStatus(`${ok} of ${files.length} images resized.${errors.length?' '+errors.length+' failed: '+errors.join(' · '):''}`);runBtn.disabled=false;runBtn.innerHTML='<i class="fa-solid fa-crop-simple"></i> Resize images';
            });
            zipBtn.addEventListener('click',async()=>{if(!outputs.length||typeof JSZip==='undefined')return;zipBtn.disabled=true;zipBtn.textContent='Preparing ZIP…';try{const zip=new JSZip();outputs.forEach(o=>zip.file(o.filename,o.blob));const blob=await zip.generateAsync({type:'blob'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='minitoolsdeck-resized-images.zip';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus('ZIP archive created and downloading.');}catch(e){setStatus('Could not create the ZIP. Download images individually instead.');}finally{zipBtn.disabled=false;zipBtn.innerHTML='<i class="fa-solid fa-file-zipper"></i> Download all (.ZIP)';}});
        })();

        let ogGeneratedHTML = '';
        function escapeOGAttr(value) {
            return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        function validOGUrl(value, required) {
            if (!value.trim()) return required ? {error:'This URL is required.'} : {value:''};
            try {
                const u = new URL(value.trim());
                if (!['http:', 'https:'].includes(u.protocol) || !u.hostname.includes('.')) return {error:'Enter a complete public http:// or https:// URL.'};
                return {value:u.href};
            } catch (_) { return {error:'Enter a complete public http:// or https:// URL.'}; }
        }
        function updateOGPreview() {
            const val = id => document.getElementById(id)?.value.trim() || '';
            const title = val('og-title'), desc = val('og-desc'), page = val('og-page-url'), img = val('og-image');
            document.getElementById('og-title-count').textContent = Array.from(title).length;
            document.getElementById('og-desc-count').textContent = Array.from(desc).length;
            document.getElementById('og-preview-title').textContent = title || 'Your share title';
            document.getElementById('og-preview-desc').textContent = desc || 'Your page description will appear here.';
            let domain = 'YOURDOMAIN.COM';
            try { if (page) domain = new URL(page).hostname; else if (img) domain = new URL(img).hostname; } catch (_) {}
            document.getElementById('og-preview-domain').textContent = domain.toUpperCase();
            const wrap = document.getElementById('og-preview-image-wrap');
            wrap.replaceChildren();
            if (img) {
                const parsed = validOGUrl(img, false);
                if (parsed.value) { const image = document.createElement('img'); image.src = parsed.value; image.alt = val('og-image-alt') || 'Social preview image'; image.style.cssText = 'width:100%;height:190px;object-fit:cover;display:block'; image.onerror = () => { wrap.textContent = 'Image could not be loaded. Check that the URL is public and correct.'; }; wrap.appendChild(image); }
                else wrap.textContent = 'Enter a valid absolute image URL';
            } else { wrap.textContent = 'Add a public preview image URL to see it here'; wrap.style.padding = '1rem'; }
        }
        function generateOGTags() {
            const get = id => document.getElementById(id).value.trim();
            const title = get('og-title'), desc = get('og-desc'), img = get('og-image'), page = get('og-page-url');
            const status = document.getElementById('og-status');
            if (!title) { status.textContent = 'Add a share title to generate tags.'; document.getElementById('og-title').focus(); return; }
            const pageUrl = validOGUrl(page, false), imageUrl = validOGUrl(img, false);
            if (pageUrl.error) { status.textContent = 'Page URL: ' + pageUrl.error; document.getElementById('og-page-url').focus(); return; }
            if (imageUrl.error) { status.textContent = 'Preview image: ' + imageUrl.error; document.getElementById('og-image').focus(); return; }
            const meta = (key, value, property='property') => value ? `<meta ${property}="${key}" content="${escapeOGAttr(value)}">` : '';
            const lines = [
                '<!-- Open Graph / social sharing -->', meta('og:title', title), meta('og:description', desc), meta('og:type', get('og-type') || 'website'),
                meta('og:url', pageUrl.value), meta('og:image', imageUrl.value), meta('og:image:alt', get('og-image-alt')), meta('og:site_name', get('og-site-name')), meta('og:locale', get('og-locale') || 'en_US'),
                '', '<!-- X (formerly Twitter) card -->', meta('twitter:card', get('og-x-card') || 'summary_large_image', 'name'), meta('twitter:title', title, 'name'), meta('twitter:description', desc, 'name'), meta('twitter:image', imageUrl.value, 'name'), meta('twitter:image:alt', get('og-image-alt'), 'name')
            ].filter((line, i) => line !== '' || i === 9).filter(Boolean);
            ogGeneratedHTML = lines.join('\n');
            document.getElementById('og-output').textContent = ogGeneratedHTML;
            document.getElementById('og-copy-btn').disabled = false;
            document.getElementById('og-download-btn').disabled = false;
            status.textContent = 'Tags generated. Add them inside the page’s <head> section.';
            updateOGPreview();
        }
        async function copyOGTags() {
            if (!ogGeneratedHTML) return;
            try { await navigator.clipboard.writeText(ogGeneratedHTML); document.getElementById('og-status').textContent = 'HTML tags copied.'; }
            catch (_) { const ta = document.createElement('textarea'); ta.value = ogGeneratedHTML; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); document.getElementById('og-status').textContent = ok ? 'HTML tags copied.' : 'Copy failed. Select and copy the code manually.'; }
        }
        function downloadOGTags() {
            if (!ogGeneratedHTML) return;
            const blob = new Blob([ogGeneratedHTML + '\n'], {type:'text/html;charset=utf-8'}), url = URL.createObjectURL(blob), a = document.createElement('a');
            a.href = url; a.download = 'social-preview-meta-tags.html'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        function resetOGBuilder() {
            ['og-page-url','og-title','og-desc','og-image','og-site-name','og-image-alt'].forEach(id => document.getElementById(id).value = '');
            document.getElementById('og-type').value = 'website'; document.getElementById('og-locale').value = 'en_US'; document.getElementById('og-x-card').value = 'summary_large_image';
            ogGeneratedHTML = ''; document.getElementById('og-output').textContent = ''; document.getElementById('og-status').textContent = '';
            document.getElementById('og-copy-btn').disabled = true; document.getElementById('og-download-btn').disabled = true; updateOGPreview();
        }

        function applyAIPromptTemplate() {
            const template = document.getElementById('ai-template')?.value || 'custom';
            const presets = {
                'seo-blog': {goal:'Blog article or outline', role:'SEO content strategist and editor', framework:'structured step-by-step instructions', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Create a useful, search-intent-aligned article that answers the reader’s main question clearly. Include a logical outline, helpful subheadings, and actionable examples. Avoid keyword stuffing.'},
                social: {goal:'Social media post', role:'Social media strategist and copywriter', framework:'creative exploration with several distinct alternatives', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Create platform-appropriate social content with a strong opening, one clear message, natural language and a relevant call to action. Avoid engagement bait and unsupported claims.'},
                email: {goal:'Marketing email or newsletter', role:'Email marketing copywriter', framework:'expert role with clear objectives and constraints', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Write a useful, audience-aware marketing email with a clear purpose, concise copy, a compelling subject line and one primary call to action. Avoid misleading urgency.'},
                ad: {goal:'Paid advertisement copy', role:'Performance marketing copywriter', framework:'problem, options, trade-offs and recommendation', format:'Return a table when comparing multiple items, followed by a brief summary.', objective:'Create ad copy for the stated audience and offer. Make the benefit clear, match the landing-page promise, and flag any claim that needs proof.'},
                youtube: {goal:'Video script', role:'YouTube scriptwriter and story editor', framework:'structured step-by-step instructions', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Create an engaging video script with a clear viewer promise, a strong first 15 seconds, useful pacing, natural spoken language and a satisfying close.'},
                product: {goal:'Product description', role:'E-commerce product copywriter', framework:'expert role with clear objectives and constraints', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Write a persuasive, accurate product description focused on customer benefits. Separate supplied facts from assumptions and do not invent specifications.'},
                business: {goal:'Business plan or strategy', role:'Business strategist and critical analyst', framework:'problem, options, trade-offs and recommendation', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Develop a practical business plan or strategy. State assumptions, distinguish facts from estimates, identify risks and recommend measurable next steps.'},
                research: {goal:'Research summary', role:'Research analyst', framework:'a draft followed by a self-review and improvements', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Summarise the topic accurately. Distinguish established facts, interpretations and unknowns; do not fabricate citations or imply sources were checked when they were not.'},
                coding: {goal:'Code solution with explanation', role:'Senior software engineer and code reviewer', framework:'problem, options, trade-offs and recommendation', format:'Use clear headings and logical sections; use bullets or numbered steps when they improve readability.', objective:'Solve the coding task with maintainable code. Explain key decisions, consider edge cases, and include runnable tests or verification steps where practical.'},
                brainstorm: {goal:'List of ideas and recommendations', role:'Creative strategist', framework:'creative exploration with several distinct alternatives', format:'Return a numbered step-by-step plan.', objective:'Generate varied, specific ideas rather than near-duplicates. Explain the intended audience or use case, trade-offs and a practical way to test the strongest options.'}
            };
            const preset = presets[template];
            if (!preset) return;
            document.getElementById('ai-objective').value = preset.objective;
            document.getElementById('ai-goal').value = preset.goal;
            document.getElementById('ai-role').value = preset.role;
            document.getElementById('ai-framework').value = preset.framework;
            document.getElementById('ai-format').value = preset.format;
            setAIPromptStatus('Template applied. Add your topic and customise any field before building the prompt.');
        }

        function generateAIPrompt(isRefresh) {
            const get = id => (document.getElementById(id)?.value || '').trim();
            const topic = get('ai-topic');
            const objective = get('ai-objective');
            if (!topic || !objective) {
                setAIPromptStatus('Please add a topic and describe the task first.');
                const firstMissing = !topic ? 'ai-topic' : 'ai-objective';
                document.getElementById(firstMissing).focus();
                return;
            }
            const fields = [
                ['ROLE', get('ai-role') || 'A capable specialist best suited to this task'],
                ['OBJECTIVE', objective],
                ['TOPIC / PROJECT', topic],
                ['TARGET AUDIENCE', get('ai-audience') || 'Infer the most relevant audience from the task; state assumptions if needed'],
                ['OUTPUT TYPE', get('ai-goal')],
                ['TONE', get('ai-tone')],
                ['APPROACH', get('ai-framework')],
                ['LEVEL OF DETAIL', get('ai-length')],
                ['BACKGROUND / CONTEXT', get('ai-context') || 'No additional context supplied. Ask concise clarifying questions only if essential; otherwise state reasonable assumptions.'],
                ['REQUIREMENTS / CONSTRAINTS', get('ai-requirements') || 'Be accurate and relevant. Do not invent facts, data, quotations or sources. Clearly flag uncertainty and missing information.'],
                ['OUTPUT STRUCTURE', get('ai-format')]
            ];
            const prompt = [
                'You are acting as ' + fields[0][1] + '.',
                '',
                'TASK AND CONTEXT',
                fields[1][1],
                '',
                'Topic or project: ' + fields[2][1],
                'Intended audience: ' + fields[3][1],
                'Requested output: ' + fields[4][1],
                '',
                'HOW TO RESPOND',
                '- Tone: ' + fields[5][1] + '.',
                '- Approach: Use ' + fields[6][1] + '.',
                '- Detail: Be ' + fields[7][1] + '.',
                '- Background: ' + fields[8][1],
                '- Requirements: ' + fields[9][1],
                '- Format: ' + fields[10][1],
                '',
                'QUALITY CHECK',
                'Before finalising, check that the response answers the objective, suits the audience, follows the requirements and format, and distinguishes facts from assumptions. If a key detail is missing, briefly identify it rather than fabricating information.'
            ].join('\n');
            const output = document.getElementById('ai-prompt-res');
            output.value = prompt;
            updateAIPromptCount();
            setAIPromptStatus(isRefresh ? 'Prompt refreshed from your current settings.' : 'Prompt built. You can edit it directly below.');
        }

        async function copyAIPrompt() {
            const output = document.getElementById('ai-prompt-res');
            if (!output.value.trim()) { setAIPromptStatus('Build a prompt before copying.'); return; }
            try {
                if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(output.value);
                else { output.focus(); output.select(); const copied = document.execCommand('copy'); if (!copied) throw new Error('Copy unavailable'); }
                setAIPromptStatus('Prompt copied to clipboard.');
            } catch (err) {
                output.focus(); output.select();
                setAIPromptStatus('Select the highlighted prompt and copy it manually.');
            }
        }

        function downloadAIPrompt() {
            const content = document.getElementById('ai-prompt-res').value;
            if (!content.trim()) { setAIPromptStatus('Build a prompt before downloading.'); return; }
            const blob = new Blob([content], {type:'text/plain;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'minitoolsdeck-ai-prompt.txt';
            document.body.appendChild(link); link.click(); link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            setAIPromptStatus('Text file downloaded.');
        }

        function clearAIPrompt() {
            ['ai-topic','ai-objective','ai-audience','ai-role','ai-context','ai-requirements'].forEach(id => { document.getElementById(id).value = ''; });
            document.getElementById('ai-template').value = 'custom';
            document.getElementById('ai-goal').selectedIndex = 0;
            document.getElementById('ai-tone').selectedIndex = 0;
            document.getElementById('ai-framework').selectedIndex = 0;
            document.getElementById('ai-length').selectedIndex = 0;
            document.getElementById('ai-format').selectedIndex = 0;
            document.getElementById('ai-prompt-res').value = '';
            updateAIPromptCount();
            setAIPromptStatus('Form reset. Start a new prompt whenever you are ready.');
        }

        document.addEventListener('input', function(event) {
            if (event.target && event.target.id === 'ai-prompt-res') updateAIPromptCount();
        });

        function updateSERP() {
            const $ = id => document.getElementById(id);
            const t = $('serp-title-input').value.trim();
            const d = $('serp-desc-input').value.trim();
            const rawUrl = $('serp-url-input').value.trim();
            const brand = $('serp-site-name').value.trim();
            const sep = $('serp-title-suffix').value;
            const title = t || 'Your SEO title will appear here';
            $('serp-title-len').textContent = Array.from(t).length;
            $('serp-desc-len').textContent = Array.from(d).length;
            $('serp-prev-title').textContent = title;
            $('serp-prev-desc').textContent = d || 'Your meta description preview will appear here. Write a useful summary that matches the page content.';
            let parsed = null;
            if (rawUrl) {
                try { parsed = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl); if (!['http:','https:'].includes(parsed.protocol)) parsed = null; } catch (_) { parsed = null; }
            }
            $('serp-prev-domain').textContent = parsed ? (brand ? brand + ' · ' + parsed.hostname : parsed.hostname) : (brand || 'example.com');
            $('serp-prev-url').textContent = parsed ? (parsed.protocol + '//' + parsed.host + parsed.pathname.replace(/\/$/, '') + parsed.search).replace(/\/$/, '') : 'https://example.com/your-page';
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext && canvas.getContext('2d');
            if (ctx) {
                ctx.font = '20px Arial';
                const tw = ctx.measureText(t).width;
                ctx.font = '14px Arial';
                const dw = ctx.measureText(d).width;
                const titlePx = Math.round(tw), descPx = Math.round(dw);
                $('serp-title-pixels').textContent = titlePx + ' px estimated';
                $('serp-desc-pixels').textContent = descPx + ' px estimated';
                const tm = $('serp-title-meter'), dm = $('serp-desc-meter');
                tm.style.width = Math.min(100, titlePx / 600 * 100) + '%'; tm.className = titlePx > 600 ? 'over' : (titlePx > 560 ? 'warn' : '');
                dm.style.width = Math.min(100, descPx / 920 * 100) + '%'; dm.className = descPx > 920 ? 'over' : (descPx > 850 ? 'warn' : '');
                $('serp-title-guidance').textContent = !t ? 'Add a descriptive title.' : titlePx > 600 ? 'May be truncated in some results.' : titlePx > 560 ? 'Getting close to a typical display width.' : 'Looks within a typical display width.';
                $('serp-desc-guidance').textContent = !d ? 'Add a useful, specific summary.' : descPx > 920 ? 'May be shortened in some results.' : descPx > 850 ? 'Getting close to a typical display width.' : 'Looks within a typical display width.';
            }
            let hint = 'Add your title, description and page URL to preview your result.';
            if (rawUrl && !parsed) hint = 'Check the page URL. Enter a valid website address beginning with https:// or http://.';
            else if (t && d && parsed) hint = 'Your preview is ready. Search engines may still choose different titles or snippets for individual searches.';
            else if (t || d || rawUrl) hint = 'Keep filling in the fields to build a more complete preview.';
            $('serp-overall-hint').textContent = hint;
        }

        function generateSERPMeta() {
            const $ = id => document.getElementById(id);
            const title = $('serp-title-input').value.trim();
            const desc = $('serp-desc-input').value.trim();
            const rawUrl = $('serp-url-input').value.trim();
            if (!title || !desc || !rawUrl) { $('serp-overall-hint').textContent = 'Please add the page URL, SEO title and meta description before generating tags.'; return; }
            let url;
            try { url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl); } catch (_) { $('serp-overall-hint').textContent = 'That page URL does not look valid. Check it and try again.'; return; }
            if (!['http:','https:'].includes(url.protocol) || !url.hostname.includes('.')) { $('serp-overall-hint').textContent = 'Use a valid public http:// or https:// page URL.'; return; }
            const esc = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const brand = $('serp-site-name').value.trim();
            const suffix = $('serp-title-suffix').value;
            const fullTitle = brand && !title.toLowerCase().includes(brand.toLowerCase()) ? title + ' ' + suffix + ' ' + brand : title;
            const html = '<title>' + esc(fullTitle) + '</title>\n<meta name="description" content="' + esc(desc) + '">\n<link rel="canonical" href="' + esc(url.href) + '">';
            $('serp-meta-output').textContent = html;
            $('serp-output-wrap').hidden = false;
            $('serp-overall-hint').textContent = 'Meta tags generated. Add them to the <head> of the matching page, then verify the published page.';
        }
        async function copySERPMeta() {
            const text = document.getElementById('serp-meta-output').textContent;
            if (!text) return;
            if (typeof copyTextSafe === 'function') { copyTextSafe(text); return; }
            try { await navigator.clipboard.writeText(text); document.getElementById('serp-overall-hint').textContent = 'Meta tags copied.'; }
            catch (_) { document.getElementById('serp-overall-hint').textContent = 'Copy was blocked by your browser. Select the generated HTML and copy it manually.'; }
        }
        function downloadSERPMeta() {
            const text = document.getElementById('serp-meta-output').textContent;
            if (!text) return;
            const blob = new Blob([text], {type:'text/html;charset=utf-8'});
            const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'seo-meta-tags.html'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        }
        function resetSERP() {
            ['serp-url-input','serp-title-input','serp-desc-input','serp-site-name'].forEach(id => document.getElementById(id).value = '');
            document.getElementById('serp-title-suffix').selectedIndex = 0;
            document.getElementById('serp-output-wrap').hidden = true;
            document.getElementById('serp-meta-output').textContent = '';
            updateSERP();
            clearSERPLogo();
        }


        // Search preview logo: client-side only, shared by drag/drop and file picker.
        let serpLogoObjectUrl = null;
        function clearSERPLogo() {
            if (serpLogoObjectUrl) { URL.revokeObjectURL(serpLogoObjectUrl); serpLogoObjectUrl = null; }
            const image = document.getElementById('serp-favicon-image');
            if (!image) return;
            image.removeAttribute('src');
            image.hidden = true;
            document.getElementById('serp-favicon-fallback').hidden = false;
            document.getElementById('serp-logo-file').value = '';
            document.getElementById('serp-logo-uploaded').textContent = '';
            document.getElementById('serp-logo-uploaded').hidden = true;
            document.getElementById('serp-logo-remove').hidden = true;
            document.getElementById('serp-logo-status').textContent = 'Your logo appears beside the website name in the search preview.';
        }
        function loadSERPLogo(file) {
            const status = document.getElementById('serp-logo-status');
            if (!file) return;
            const allowed = ['image/png','image/jpeg','image/webp','image/svg+xml'];
            const type = (file.type || '').toLowerCase();
            if (!allowed.includes(type)) { status.textContent = 'Please choose a PNG, JPG, WebP or SVG image.'; return; }
            if (file.size > 5 * 1024 * 1024) { status.textContent = 'Logo must be 5 MB or smaller.'; return; }
            if (file.size === 0) { status.textContent = 'That file is empty. Choose another image.'; return; }
            const candidate = URL.createObjectURL(file);
            const probe = new Image();
            probe.onload = () => {
                if (serpLogoObjectUrl) URL.revokeObjectURL(serpLogoObjectUrl);
                serpLogoObjectUrl = candidate;
                const image = document.getElementById('serp-favicon-image');
                image.src = candidate;
                image.hidden = false;
                document.getElementById('serp-favicon-fallback').hidden = true;
                document.getElementById('serp-logo-uploaded').textContent = '✓ Added';
                document.getElementById('serp-logo-uploaded').hidden = false;
                document.getElementById('serp-logo-remove').hidden = false;
                status.textContent = 'Logo added to your live search preview. Kept in this browser only.';
            };
            probe.onerror = () => { URL.revokeObjectURL(candidate); status.textContent = 'Could not read that image. Try another file.'; };
            probe.src = candidate;
        }
        function initSERPLogoUpload() {
            const zone = document.getElementById('serp-logo-dropzone');
            const input = document.getElementById('serp-logo-file');
            const remove = document.getElementById('serp-logo-remove');
            if (!zone || !input || !remove || zone.dataset.initialized) return;
            zone.dataset.initialized = 'true';
            zone.addEventListener('click', () => input.click());
            zone.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); }
            });
            input.addEventListener('change', () => { if (input.files && input.files[0]) loadSERPLogo(input.files[0]); });
            zone.addEventListener('dragenter', event => { event.preventDefault(); zone.classList.add('is-dragging'); });
            zone.addEventListener('dragover', event => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; zone.classList.add('is-dragging'); });
            zone.addEventListener('dragleave', event => { event.preventDefault(); if (!zone.contains(event.relatedTarget)) zone.classList.remove('is-dragging'); });
            zone.addEventListener('drop', event => {
                event.preventDefault(); zone.classList.remove('is-dragging');
                if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) loadSERPLogo(event.dataTransfer.files[0]);
            });
            remove.addEventListener('click', clearSERPLogo);
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSERPLogoUpload);
        else initSERPLogoUpload();

        let aspectRatioLocked = true;
        let aspectStudioLastEdited = 'width';
        function calcAspectRatio() { updateAspectStudio('width'); }
        function gcdAspect(a, b) { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); while (b) { const t = b; b = a % b; a = t; } return a || 1; }
        function aspectRatioText(w, h) {
            if (!(w > 0 && h > 0)) return '—';
            const g = gcdAspect(w, h);
            return (w / g) + ':' + (h / g);
        }
        function updateAspectStudio(changed) {
            const owEl = document.getElementById('ar-orig-w'), ohEl = document.getElementById('ar-orig-h');
            const nwEl = document.getElementById('ar-new-w'), nhEl = document.getElementById('ar-new-h');
            const ow = Number(owEl.value), oh = Number(ohEl.value);
            let nw = Number(nwEl.value), nh = Number(nhEl.value);
            const status = document.getElementById('ar-status');
            if (changed === 'width' || changed === 'height') aspectStudioLastEdited = changed;
            if (changed === 'source' && aspectRatioLocked && ow > 0 && oh > 0) {
                if (aspectStudioLastEdited === 'height' && nh > 0) nwEl.value = Math.max(1, Math.round(nh * ow / oh));
                else if (nw > 0) nhEl.value = Math.max(1, Math.round(nw * oh / ow));
                nw = Number(nwEl.value); nh = Number(nhEl.value);
            } else if (aspectRatioLocked && ow > 0 && oh > 0 && (changed === 'width' || changed === 'height')) {
                if (changed === 'width' && nw > 0) nhEl.value = Math.max(1, Math.round(nw * oh / ow));
                if (changed === 'height' && nh > 0) nwEl.value = Math.max(1, Math.round(nh * ow / oh));
                nw = Number(nwEl.value); nh = Number(nhEl.value);
            }
            if (![ow, oh, nw, nh].every(v => Number.isFinite(v) && v > 0 && v <= 100000)) {
                document.getElementById('ar-res-dims').textContent = 'Enter valid dimensions';
                document.getElementById('ar-ratio-str').textContent = 'Use whole numbers from 1 to 100,000 px.';
                document.getElementById('ar-scale').textContent = '—';
                document.getElementById('ar-pixels').textContent = '—';
                status.textContent = 'Check that all dimensions are positive and within the supported range.';
                return;
            }
            const mode = document.getElementById('ar-fit-mode').value;
            let outW = nw, outH = nh;
            const sourceRatio = ow / oh, targetRatio = nw / nh;
            if (mode === 'contain') {
                const scale = Math.min(nw / ow, nh / oh); outW = Math.max(1, Math.round(ow * scale)); outH = Math.max(1, Math.round(oh * scale));
                document.getElementById('ar-fit-note').textContent = 'Fit scales the full image inside the target box and may leave unused space.';
                status.textContent = Math.abs(sourceRatio - targetRatio) < 0.0001 ? 'Target keeps the original proportions.' : 'Image fits inside the target without cropping; the output may be smaller than the target box.';
            } else {
                const scale = Math.max(nw / ow, nh / oh); outW = Math.max(1, Math.round(ow * scale)); outH = Math.max(1, Math.round(oh * scale));
                document.getElementById('ar-fit-note').textContent = 'Fill covers the entire target box; cropping the overflow may be needed.';
                status.textContent = Math.abs(sourceRatio - targetRatio) < 0.0001 ? 'Target keeps the original proportions.' : 'To fill the target without empty space, crop the overflow from the scaled image.';
            }
            document.getElementById('ar-res-dims').textContent = outW.toLocaleString() + ' × ' + outH.toLocaleString() + ' px';
            document.getElementById('ar-ratio-str').textContent = 'Source ratio: ' + aspectRatioText(ow, oh) + ' · Target ratio: ' + aspectRatioText(nw, nh);
            document.getElementById('ar-scale').textContent = (Math.min(nw / ow, nh / oh) * 100).toFixed(1) + '%';
            document.getElementById('ar-pixels').textContent = (outW * outH / 1000000).toFixed(2) + ' MP';
        }
        function setAspectLock(locked) {
            aspectRatioLocked = locked;
            document.getElementById('ar-lock-btn').setAttribute('aria-pressed', String(locked));
            document.getElementById('ar-unlock-btn').setAttribute('aria-pressed', String(!locked));
            document.getElementById('ar-lock-btn').style.opacity = locked ? '1' : '0.65';
            document.getElementById('ar-unlock-btn').style.opacity = locked ? '0.65' : '1';
            updateAspectStudio('mode');
        }
        function applyAspectPreset() {
            const presets = {'custom':null,'ig-square':[1080,1080],'ig-portrait':[1080,1350],'ig-story':[1080,1920],'yt-thumb':[1280,720],'yt-banner':[2560,1440],'fb-cover':[1640,624],'linkedin':[1200,627],'og-image':[1200,630],'hd':[1920,1080],'4k':[3840,2160]};
            const val = document.getElementById('ar-preset').value, preset = presets[val];
            if (!preset) return;
            document.getElementById('ar-new-w').value = preset[0]; document.getElementById('ar-new-h').value = preset[1];
            setAspectLock(false); updateAspectStudio('mode');
        }
        function setAspectRatio(w, h) {
            document.getElementById('ar-new-w').value = 1080;
            document.getElementById('ar-new-h').value = Math.round(1080 * h / w);
            document.getElementById('ar-preset').value = 'custom';
            setAspectLock(false); updateAspectStudio('mode');
        }
        function copyAspectDimensions() {
            const t = document.getElementById('ar-res-dims').textContent;
            if (!t || t.includes('Enter valid')) return;
            if (typeof copyTextSafe === 'function') copyTextSafe(t); else navigator.clipboard?.writeText(t);
        }
        function copyAspectRatio() {
            const t = document.getElementById('ar-ratio-str').textContent;
            if (typeof copyTextSafe === 'function') copyTextSafe(t); else navigator.clipboard?.writeText(t);
        }
        function resetAspectStudio() {
            document.getElementById('ar-preset').value = 'custom'; document.getElementById('ar-orig-w').value = 1920; document.getElementById('ar-orig-h').value = 1080;
            document.getElementById('ar-new-w').value = 1280; document.getElementById('ar-new-h').value = 720; document.getElementById('ar-fit-mode').value = 'contain';
            aspectStudioLastEdited = 'width'; setAspectLock(true); updateAspectStudio('width');
        }
        document.addEventListener('DOMContentLoaded', function() { if (document.getElementById('ar-res-dims')) updateAspectStudio('width'); });

        let keywordAnalysisCache = null;
        const keywordStopWords = new Set('a an and are as at be been but by can could did do does for from had has have he her hers him his how i if in into is it its may me might more most my no not of on or our ours she should so than that the their theirs them then there these they this those to too up us was we were what when where which who why will with would you your yours'.split(' '));
        function keywordEscapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
        function updateKeywordInputStats() {
            const text = document.getElementById('keyword-input')?.value || '';
            const words = (text.match(/[\p{L}\p{N}]+(?:['’_-][\p{L}\p{N}]+)*/gu) || []);
            const el = document.getElementById('keyword-input-stats');
            if (el) el.innerHTML = `<span>${words.length.toLocaleString()} words</span><span>${text.length.toLocaleString()} characters</span>`;
        }
        function analyzeKeywords() {
            const raw = document.getElementById('keyword-input').value.trim();
            const reportEl = document.getElementById('keyword-target-report');
            const listEl = document.getElementById('keyword-list');
            if (!raw) { reportEl.textContent = 'Paste some content to begin your analysis.'; listEl.textContent = 'No content analyzed yet.'; return; }
            const tokenMatches = raw.match(/[\p{L}\p{N}]+(?:['’_-][\p{L}\p{N}]+)*/gu) || [];
            const tokens = tokenMatches.map(w => w.toLocaleLowerCase());
            const total = tokens.length;
            const unique = new Set(tokens).size;
            const sentences = (raw.match(/[^.!?]+(?:[.!?]+|$)/g) || []).map(x => x.trim()).filter(Boolean).length;
            document.getElementById('keyword-total-words').textContent = total.toLocaleString();
            document.getElementById('keyword-unique-words').textContent = unique.toLocaleString();
            document.getElementById('keyword-sentences').textContent = sentences.toLocaleString();
            document.getElementById('keyword-reading-time').textContent = `${Math.max(1, Math.ceil(total / 220))} min`;
            const ignoreStop = document.getElementById('keyword-ignore-stop').checked;
            const includeSingle = document.getElementById('keyword-include-single').checked;
            const maxN = Number(document.getElementById('keyword-ngram').value) || 2;
            const minCount = Number(document.getElementById('keyword-min-count').value) || 2;
            const eligible = tokens.map(w => (!includeSingle && [...w].length < 2) || (ignoreStop && keywordStopWords.has(w)) ? null : w);
            const counts = new Map();
            for (let n = 1; n <= maxN; n++) {
                for (let i = 0; i <= eligible.length - n; i++) {
                    const group = eligible.slice(i, i+n);
                    if (group.some(w => w === null)) continue;
                    const phrase = group.join(' ');
                    counts.set(phrase, (counts.get(phrase) || 0) + 1);
                }
            }
            const ranked = [...counts.entries()].filter(([,count]) => count >= minCount).sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0])).slice(0, 50).map(([term,count]) => ({term,count,density: total ? count / total * 100 : 0}));
            keywordAnalysisCache = {raw, total, unique, sentences, ranked};
            const targetsRaw = document.getElementById('keyword-targets').value;
            const targets = [...new Set(targetsRaw.split(',').map(x => x.trim().toLocaleLowerCase()).filter(Boolean))];
            if (!targets.length) {
                reportEl.innerHTML = '<p style="margin:0;">No target phrases entered. Add comma-separated keywords above to check their exact frequency and density.</p>';
            } else {
                reportEl.innerHTML = '<div style="display:grid;gap:.55rem;">' + targets.map(term => {
                    const escaped = keywordEscapeHTML(term);
                    const re = new RegExp('(^|[^\\p{L}\\p{N}])' + term.split(/\s+/).map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+') + '(?=$|[^\\p{L}\\p{N}])', 'giu');
                    const matches = [...raw.matchAll(re)].length;
                    const density = total ? matches / total * 100 : 0;
                    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:.75rem;border-bottom:1px solid var(--border-color);padding:.45rem 0;"><span style="overflow-wrap:anywhere;"><strong>${escaped}</strong><br><small>${matches} exact match${matches===1?'':'es'}</small></span><strong style="white-space:nowrap;color:var(--accent);">${density.toFixed(2)}%</strong></div>`;
                }).join('') + '</div>';
            }
            if (!ranked.length) {
                listEl.textContent = 'No terms meet the current minimum-occurrence setting. Try lowering it or including common words.';
            } else {
                listEl.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:.88rem;"><thead><tr><th style="text-align:left;padding:.5rem .3rem;border-bottom:1px solid var(--border-color);">Word / phrase</th><th style="text-align:right;padding:.5rem .3rem;border-bottom:1px solid var(--border-color);">Count</th><th style="text-align:right;padding:.5rem .3rem;border-bottom:1px solid var(--border-color);">Density*</th></tr></thead><tbody>${ranked.map(r=>`<tr><td style="padding:.5rem .3rem;border-bottom:1px solid var(--border-color);overflow-wrap:anywhere;">${keywordEscapeHTML(r.term)}</td><td style="text-align:right;padding:.5rem .3rem;border-bottom:1px solid var(--border-color);">${r.count}</td><td style="text-align:right;padding:.5rem .3rem;border-bottom:1px solid var(--border-color);">${r.density.toFixed(2)}%</td></tr>`).join('')}</tbody></table><p style="font-size:.75rem;color:var(--text-muted,#777);margin:.5rem 0 0;">*Occurrences divided by total words; phrase densities can overlap and are not additive.</p>`;
            }
        }
        function loadKeywordSample() {
            document.getElementById('keyword-input').value = 'Good content strategy starts with understanding your audience. A content strategy helps teams plan useful content, publish consistently, and measure results. Strong content answers real questions instead of repeating the same keyword too often. Review keyword usage, improve clarity, and make every page helpful for readers.';
            document.getElementById('keyword-targets').value = 'content strategy, keyword, useful content';
            updateKeywordInputStats(); analyzeKeywords();
        }
        function resetKeywordAnalyzer() {
            ['keyword-input','keyword-targets'].forEach(id => document.getElementById(id).value = '');
            document.getElementById('keyword-ngram').value = '2'; document.getElementById('keyword-min-count').value = '2';
            document.getElementById('keyword-ignore-stop').checked = true; document.getElementById('keyword-include-single').checked = false;
            ['keyword-total-words','keyword-unique-words','keyword-sentences','keyword-reading-time'].forEach(id => document.getElementById(id).textContent = '—');
            document.getElementById('keyword-target-report').textContent = 'Add content and optional target phrases, then analyze.';
            document.getElementById('keyword-list').textContent = 'Your frequency table will appear here.'; keywordAnalysisCache = null; updateKeywordInputStats();
        }
        async function copyKeywordReport() {
            if (!keywordAnalysisCache) { analyzeKeywords(); if (!keywordAnalysisCache) return; }
            const {raw,total,unique,sentences,ranked} = keywordAnalysisCache;
            const targets = document.getElementById('keyword-targets').value.trim();
            const text = `KEYWORD DENSITY REPORT\nWords: ${total}\nUnique words: ${unique}\nSentences: ${sentences}\nTargets: ${targets || 'None'}\n\nTOP TERMS\n${ranked.map(r=>`${r.term} | ${r.count} occurrences | ${r.density.toFixed(2)}%`).join('\n')}\n\nDensity is descriptive, not a ranking score.`;
            const btn = document.querySelector('#tool-keyword button[onclick="copyKeywordReport()"]');
            await copyTextSafe(text, btn);
        }
        function downloadKeywordCSV() {
            if (!keywordAnalysisCache) { analyzeKeywords(); if (!keywordAnalysisCache) return; }
            const rows = [['Term','Occurrences','Density (%)'], ...keywordAnalysisCache.ranked.map(r=>[r.term,r.count,r.density.toFixed(2)])];
            const csv = rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
            const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8;'});
            const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='keyword-density-report.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        }

        function analyzeHeadline() {
            const input = document.getElementById('headline-input');
            const t = input ? input.value.trim() : '';
            const platform = document.getElementById('headline-platform')?.value || 'blog';
            const scoreEl = document.getElementById('headline-score');
            const fill = document.getElementById('headline-score-fill');
            const feedback = document.getElementById('headline-feedback');
            const recEl = document.getElementById('headline-recommendations');
            const wordEl = document.getElementById('hl-words');
            const charEl = document.getElementById('hl-chars');
            if (!t) {
                scoreEl.textContent = '—';
                fill.style.width = '0%';
                fill.style.background = 'var(--accent)';
                wordEl.textContent = '0';
                charEl.textContent = '0';
                feedback.textContent = 'Your headline tips will appear here.';
                recEl.textContent = 'Enter a headline to see alternatives.';
                return;
            }

            const words = t.split(/\s+/).filter(Boolean);
            const wordCount = words.length;
            const charCount = Array.from(t).length;
            const ideals = {
                blog: {minC: 40, maxC: 60, minW: 6, maxW: 12},
                youtube: {minC: 40, maxC: 70, minW: 5, maxW: 12},
                email: {minC: 30, maxC: 50, minW: 4, maxW: 9},
                linkedin: {minC: 40, maxC: 80, minW: 5, maxW: 14},
                twitter: {minC: 20, maxC: 70, minW: 4, maxW: 12},
                social: {minC: 30, maxC: 80, minW: 4, maxW: 12},
                ad: {minC: 20, maxC: 40, minW: 3, maxW: 8}
            };
            const ideal = ideals[platform] || ideals.blog;
            const lower = t.toLowerCase();
            const powerWords = ['free','proven','secret','ultimate','fast','easy','new','essential','powerful','simple','effective','best','top','boost','grow','unlock','discover','exclusive','today'];
            const foundPower = powerWords.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(lower));
            // Keep this as a modest checklist score, not a prediction of performance.
            let score = 40;
            if (charCount >= ideal.minC && charCount <= ideal.maxC) score += 20;
            else if (charCount >= ideal.minC - 10 && charCount <= ideal.maxC + 15) score += 8;
            else score -= 10;
            if (wordCount >= ideal.minW && wordCount <= ideal.maxW) score += 15;
            else if (wordCount > ideal.maxW) score -= 8;
            if (foundPower.length) score += 5;
            if (/\d/.test(t)) score += 5;
            if (/[?!]/.test(t)) score += 5;
            score = Math.max(0, Math.min(100, Math.round(score)));

            scoreEl.textContent = score + ' / 100';
            fill.style.width = score + '%';
            fill.style.background = score >= 75 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444';
            wordEl.textContent = wordCount;
            charEl.textContent = charCount;

            let tip = '';
            if (charCount < ideal.minC) tip = 'Consider adding a little more detail so the benefit is clearer.';
            else if (charCount > ideal.maxC) tip = 'Try shortening it so the main idea is easier to scan.';
            else if (wordCount > ideal.maxW) tip = 'Trim a few words and keep the most important promise.';
            else if (!/\d/.test(t) && wordCount >= 4) tip = 'If it fits naturally, a specific number can make the promise more concrete.';
            else if (!foundPower.length) tip = 'Make the benefit more specific; avoid adding “power words” unless they genuinely fit.';
            else tip = 'This is a reasonable starting point. Make sure the wording is specific and accurate for your audience.';
            feedback.textContent = tip;

            // Build alternatives from a cleaned topic phrase rather than repeating the
            // entire original headline inside templates (which created broken wording).
            const cleaned = t.replace(/[.!?]+$/, '').trim();
            let subject = cleaned
                .replace(/^(?:how to|how|why|what to know about|what is|what are|a guide to|the ultimate guide to|the complete guide to)\s+/i, '')
                .replace(/\s+(?:is|are|was|were)\s+(?:the\s+)?(?:best|greatest|perfect|amazing|important|essential|worth it|a must-have)\s*$/i, '')
                .replace(/\s+(?:explained|review|reviews|guide|tips|benefits|ideas)\s*$/i, '')
                .replace(/[:–—-]+\s*$/, '')
                .trim();
            if (!subject || subject.length < 2) subject = cleaned;
            const titleCase = value => value.replace(/\b([a-z])/g, (match, letter, offset) => letter.toUpperCase());
            const topic = titleCase(subject);
            const alternatives = [
                `A Practical Guide to ${topic}`,
                `${topic}: ${wordCount <= 6 ? 'A Clear, Practical Guide' : 'What Matters Most'}`,
                `What to Know About ${topic} Before You Decide`
            ];
            // Match alternatives to the chosen placement while keeping the score explicitly heuristic.
            if (platform === 'youtube') {
                alternatives[0] = `${topic}: What Beginners Should Know`;
                alternatives[1] = `I Tested the Basics of ${topic} — Here’s What Matters`;
                alternatives[2] = `Avoid These Common ${topic} Mistakes`;
            } else if (platform === 'email') {
                alternatives[0] = `A practical next step for ${subject}`;
                alternatives[1] = `Could this help with ${subject}?`;
                alternatives[2] = `What to know about ${subject}`;
            } else if (platform === 'ad') {
                alternatives[0] = `Make ${subject} simpler`;
                alternatives[1] = `Explore a better approach to ${subject}`;
                alternatives[2] = `Find the right ${subject} solution`;
            }
            recEl.replaceChildren();
            alternatives.forEach((text, index) => {
                const row = document.createElement('div');
                row.style.cssText = 'display:flex;align-items:flex-start;gap:0.6rem;justify-content:space-between;padding:0.7rem 0;border-bottom:1px solid var(--border-color);';
                const copy = document.createElement('span');
                copy.style.flex = '1';
                copy.textContent = text;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'copy-btn';
                button.style.cssText = 'padding:0.3rem 0.6rem;font-size:0.75rem;flex-shrink:0;margin:0;';
                button.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copy';
                button.addEventListener('click', () => copyTextSafe(text, button));
                row.append(copy, button);
                recEl.appendChild(row);
            });
        }

        async function copyTextSafe(text, button) {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const temp = document.createElement('textarea');
                    temp.value = text;
                    temp.style.position = 'fixed';
                    temp.style.opacity = '0';
                    document.body.appendChild(temp);
                    temp.select();
                    const ok = document.execCommand('copy');
                    temp.remove();
                    if (!ok) throw new Error('Copy unavailable');
                }
                const old = button.textContent;
                button.textContent = 'Copied';
                setTimeout(() => { button.textContent = old; }, 1200);
            } catch (error) {
                button.textContent = 'Select to copy';
            }
        }

        let readabilityReportText = '';
        function updateReadabilityInputStats() {
            const t = document.getElementById('readability-input').value;
            const words = (t.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu) || []).length;
            document.getElementById('readability-live-stats').textContent = `${words.toLocaleString()} words · ${t.length.toLocaleString()} characters`;
        }
        function readabilitySyllables(word) {
            let w = String(word).toLowerCase().replace(/[^a-z]/g, '');
            if (!w) return 1;
            if (w.length <= 3) return 1;
            w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/i, '').replace(/^y/i, '');
            const groups = w.match(/[aeiouy]{1,2}/g);
            return Math.max(1, groups ? groups.length : 1);
        }
        function readabilityEscape(value) {
            return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
        }
        function analyzeReadability() {
            const raw = document.getElementById('readability-input').value.trim();
            if (!raw) return alert('Enter some text to analyze.');
            const words = raw.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu) || [];
            const sentences = (raw.match(/[^.!?]+(?:[.!?]+|$)/g) || []).map(x => x.trim()).filter(x => /[\p{L}\p{N}]/u.test(x));
            const wordCount = words.length;
            const sentenceCount = Math.max(1, sentences.length);
            const syllableCount = words.reduce((sum, word) => sum + readabilitySyllables(word), 0);
            const complexCount = words.filter(word => readabilitySyllables(word) >= 3).length;
            const avgWords = wordCount / sentenceCount;
            const avgSyllables = wordCount ? syllableCount / wordCount : 0;
            const flesch = wordCount ? 206.835 - 1.015 * avgWords - 84.6 * avgSyllables : 0;
            const fkGrade = wordCount ? 0.39 * avgWords + 11.8 * avgSyllables - 15.59 : 0;
            const fog = wordCount ? 0.4 * (avgWords + 100 * complexCount / wordCount) : 0;
            const score = Math.max(0, Math.min(100, flesch));
            let interpretation = 'Very difficult';
            if (score >= 90) interpretation = 'Very easy';
            else if (score >= 80) interpretation = 'Easy';
            else if (score >= 70) interpretation = 'Fairly easy';
            else if (score >= 60) interpretation = 'Plain English';
            else if (score >= 50) interpretation = 'Fairly difficult';
            else if (score >= 30) interpretation = 'Difficult';
            const tips = [];
            if (avgWords > 20) tips.push(`Average sentence length is ${avgWords.toFixed(1)} words. Try splitting long sentences, especially where they contain several ideas.`);
            else if (avgWords > 0 && avgWords < 8) tips.push('Sentences are very short on average. Check that the writing still flows naturally and does not feel choppy.');
            else tips.push(`Average sentence length is ${avgWords.toFixed(1)} words, a useful starting point for general web copy.`);
            const complexPct = wordCount ? complexCount / wordCount * 100 : 0;
            if (complexPct > 20) tips.push(`${complexPct.toFixed(1)}% of words are estimated to have three or more syllables. Replace unnecessary jargon with familiar words where possible.`);
            else tips.push(`About ${complexPct.toFixed(1)}% of words are estimated to have three or more syllables.`);
            if (score < 50) tips.push('Consider putting the main point first, using active voice, and explaining specialist terms the first time they appear.');
            if (sentenceCount < 3) tips.push('This is a short sample. Scores can swing significantly with only a few sentences; test a larger passage for a steadier estimate.');
            const longSentences = sentences.map((sentence, i) => ({sentence, i, count:(sentence.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu)||[]).length})).filter(x => x.count >= 25).sort((a,b)=>b.count-a.count).slice(0,5);
            document.getElementById('readability-results').style.display = 'block';
            document.getElementById('readability-score').textContent = Number.isFinite(flesch) ? score.toFixed(1) : '—';
            document.getElementById('readability-grade').textContent = Number.isFinite(fkGrade) ? `Grade ${Math.max(0,fkGrade).toFixed(1)}` : '—';
            document.getElementById('readability-fog').textContent = Number.isFinite(fog) ? Math.max(0,fog).toFixed(1) : '—';
            document.getElementById('readability-time').textContent = wordCount < 220 ? `${Math.max(1,Math.ceil(wordCount/220))} min` : `${Math.ceil(wordCount/220)} min`;
            document.getElementById('readability-interpretation').textContent = interpretation;
            document.getElementById('readability-counts').textContent = `${wordCount.toLocaleString()} words · ${sentenceCount.toLocaleString()} sentences · ${syllableCount.toLocaleString()} estimated syllables`;
            document.getElementById('readability-diagnostics').innerHTML = `<ul style="padding-left:1.2rem;margin:.2rem 0;">${tips.map(t=>`<li>${readabilityEscape(t)}</li>`).join('')}</ul>`;
            document.getElementById('readability-long-sentences').innerHTML = longSentences.length ? longSentences.map(x=>`<div style="padding:.7rem 0;border-bottom:1px solid var(--border);"><strong>${x.count} words</strong><div style="margin-top:.25rem;">${readabilityEscape(x.sentence)}</div><div style="font-size:.82rem;color:var(--text-muted);margin-top:.25rem;">Consider splitting this into shorter sentences.</div></div>`).join('') : '<p style="margin:.25rem 0;">No sentences of 25 words or more found. That is only a rough signal—long sentences can still be clear.</p>';
            readabilityReportText = `READABILITY REPORT\nFlesch Reading Ease: ${score.toFixed(1)} (${interpretation})\nFlesch–Kincaid Grade: ${Math.max(0,fkGrade).toFixed(1)}\nGunning Fog Index: ${Math.max(0,fog).toFixed(1)}\nWords: ${wordCount}\nSentences: ${sentenceCount}\nEstimated syllables: ${syllableCount}\nAverage words per sentence: ${avgWords.toFixed(1)}\nEstimated complex words (3+ syllables): ${complexPct.toFixed(1)}%\n\nSUGGESTIONS\n- ${tips.join('\n- ')}\n\nLONG SENTENCES\n${longSentences.length ? longSentences.map(x=>`(${x.count} words) ${x.sentence}`).join('\n') : 'No sentences of 25+ words found.'}`;
            updateReadabilityInputStats();
        }
        function loadReadabilitySample() {
            document.getElementById('readability-input').value = 'Good website content helps people find answers quickly. Use clear headings and short paragraphs so readers can scan the page. Explain unfamiliar terms, choose specific words, and put the most important information first. When a sentence contains several ideas, split it into smaller parts. Simple writing can still be accurate, useful, and engaging.';
            updateReadabilityInputStats();
            analyzeReadability();
        }
        function resetReadability() {
            document.getElementById('readability-input').value = '';
            document.getElementById('readability-results').style.display = 'none';
            document.getElementById('readability-score').textContent = '--';
            document.getElementById('readability-grade').textContent = '--';
            document.getElementById('readability-fog').textContent = '--';
            document.getElementById('readability-time').textContent = '--';
            readabilityReportText = '';
            updateReadabilityInputStats();
        }
        async function copyReadabilityReport() {
            if (!readabilityReportText) return alert('Analyze some text first.');
            const btn = document.querySelector('#tool-readability button[onclick="copyReadabilityReport()"]');
            if (typeof copyTextSafe === 'function') return copyTextSafe(readabilityReportText, btn);
            try { await navigator.clipboard.writeText(readabilityReportText); if(btn) btn.textContent='Copied'; }
            catch(e) { alert('Copy is unavailable in this browser.'); }
        }

        function normalizeContrastHex(value) {
            let hex = String(value || '').trim().replace(/^#/, '');
            if (/^[0-9a-fA-F]{3}$/.test(hex)) hex = hex.split('').map(ch => ch + ch).join('');
            if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
            return '#' + hex.toUpperCase();
        }
        function contrastHexChanged(which) {
            const hexInput = document.getElementById(which === 'text' ? 'contrast-text-hex' : 'contrast-bg-hex');
            const picker = document.getElementById(which === 'text' ? 'contrast-text' : 'contrast-bg');
            const normalized = normalizeContrastHex(hexInput.value);
            hexInput.style.borderColor = normalized ? '' : 'var(--danger, #dc2626)';
            if (normalized) { picker.value = normalized.toLowerCase(); }
            checkContrast();
        }
        function contrastPickerChanged(which) {
            const picker = document.getElementById(which === 'text' ? 'contrast-text' : 'contrast-bg');
            const hexInput = document.getElementById(which === 'text' ? 'contrast-text-hex' : 'contrast-bg-hex');
            hexInput.value = picker.value.toUpperCase();
            hexInput.style.borderColor = '';
            checkContrast();
        }
        function setContrastPreset(textColor, bgColor) {
            document.getElementById('contrast-text').value = textColor;
            document.getElementById('contrast-bg').value = bgColor;
            document.getElementById('contrast-text-hex').value = textColor;
            document.getElementById('contrast-bg-hex').value = bgColor;
            document.getElementById('contrast-text-hex').style.borderColor = '';
            document.getElementById('contrast-bg-hex').style.borderColor = '';
            checkContrast();
        }
        function swapContrastColors() {
            const textColor = document.getElementById('contrast-text').value;
            const bgColor = document.getElementById('contrast-bg').value;
            setContrastPreset(bgColor, textColor);
        }
        function contrastLuminance(hex) {
            const rgb = hex.slice(1).match(/.{2}/g).map(part => parseInt(part, 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4));
            return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        }
        function checkContrast() {
            const textInput = document.getElementById('contrast-text-hex');
            const bgInput = document.getElementById('contrast-bg-hex');
            if (!textInput || !bgInput) return;
            const textHex = normalizeContrastHex(textInput.value);
            const bgHex = normalizeContrastHex(bgInput.value);
            const result = document.getElementById('contrast-res');
            const grade = document.getElementById('contrast-grade');
            const preview = document.getElementById('contrast-box');
            const statusIds = [['contrast-aa-normal', 4.5], ['contrast-aa-large', 3], ['contrast-aaa-normal', 7], ['contrast-aaa-large', 4.5]];
            if (!textHex || !bgHex) {
                result.textContent = '--';
                grade.textContent = 'Enter valid 3- or 6-digit HEX colours';
                statusIds.forEach(([id]) => { const el = document.getElementById(id); if (el) el.textContent = '--'; });
                return;
            }
            const l1 = contrastLuminance(textHex), l2 = contrastLuminance(bgHex);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            result.textContent = ratio.toFixed(2) + ':1';
            preview.style.backgroundColor = bgHex;
            preview.style.color = textHex;
            const outcomes = statusIds.map(([id, threshold]) => ({ id, threshold, pass: ratio >= threshold }));
            outcomes.forEach(({id, pass}) => { const el = document.getElementById(id); if (el) { el.textContent = pass ? 'PASS' : 'FAIL'; el.style.color = pass ? '#16a34a' : '#dc2626'; } });
            const passed = outcomes.filter(item => item.pass).length;
            grade.textContent = passed === 4 ? 'Passes all four WCAG AA/AAA text contrast checks' : passed === 0 ? 'Does not meet the listed WCAG text contrast thresholds' : `${passed} of 4 WCAG text contrast checks passed`;
        }

        let jsonTsLastOutput = '';
        function updateJsonTsStats() {
            const el = document.getElementById('json-ts-input');
            const text = el ? el.value : '';
            const stats = document.getElementById('json-ts-stats');
            if (stats) stats.textContent = `${text.length.toLocaleString()} characters · ${text ? text.split(/\r\n|\r|\n/).length : 0} lines`;
        }
        function jsonTsSafeName(value, fallback) {
            let name = String(value || '').trim().replace(/[^A-Za-z0-9_$]/g, '');
            if (!name) name = fallback;
            if (/^[0-9]/.test(name)) name = '_' + name;
            return name;
        }
        function jsonTsProperty(key) {
            return /^[$A-Z_a-z][$\w]*$/.test(key) ? key : JSON.stringify(key);
        }
        function jsonTsType(value, context) {
            if (value === null) return 'null';
            if (Array.isArray(value)) {
                if (!value.length) return 'unknown[]';
                const types = [...new Set(value.map(item => jsonTsType(item, context)))];
                let itemType = types.join(' | ');
                if (types.length > 1) itemType = `(${itemType})`;
                return itemType + '[]';
            }
            if (typeof value === 'object') return jsonTsBuildObject(value, context);
            if (typeof value === 'string') return 'string';
            if (typeof value === 'number') return Number.isInteger(value) ? 'number' : 'number';
            if (typeof value === 'boolean') return 'boolean';
            return 'unknown';
        }
        function jsonTsBuildObject(obj, context) {
            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return 'Record<string, unknown>';
            const entries = Object.entries(obj);
            if (!entries.length) return 'Record<string, unknown>';
            const lines = entries.map(([key, value]) => {
                const optional = document.getElementById('json-ts-optional')?.checked ? '?' : '';
                const readonly = document.getElementById('json-ts-readonly')?.checked ? 'readonly ' : '';
                return `  ${readonly}${jsonTsProperty(key)}${optional}: ${jsonTsType(value, context)};`;
            });
            return ` {\n${lines.join('\n')}\n}`;
        }
        function convertJsonToTs(showAlert = true) {
            const input = document.getElementById('json-ts-input');
            const output = document.getElementById('json-ts-output');
            const error = document.getElementById('json-ts-error');
            if (!input || !output) return;
            const raw = input.value.trim();
            if (error) error.textContent = '';
            if (!raw) {
                jsonTsLastOutput = '';
                output.textContent = '// Paste valid JSON to generate TypeScript.';
                if (error) error.textContent = 'Add a JSON object or array to get started.';
                return;
            }
            try {
                const data = JSON.parse(raw);
                if (data === null || typeof data !== 'object') throw new Error('The top-level JSON value must be an object or array.');
                const rootName = jsonTsSafeName(document.getElementById('json-ts-root')?.value, 'Root');
                const style = document.getElementById('json-ts-style')?.value || 'interface';
                const useExport = document.getElementById('json-ts-export')?.checked;
                const declarations = [];
                const seen = new Map();
                const usedNames = new Set();
                function typeFor(value, suggestedName) {
                    if (value === null) return 'null';
                    if (Array.isArray(value)) {
                        if (!value.length) return 'unknown[]';
                        const itemTypes = [...new Set(value.map(item => typeFor(item, suggestedName + 'Item')))];
                        let t = itemTypes.join(' | ');
                        if (itemTypes.length > 1) t = `(${t})`;
                        return `${t}[]`;
                    }
                    if (typeof value === 'object') {
                        const typeName = jsonTsSafeName(suggestedName, 'NestedType');
                        const decl = objectDeclaration(value, typeName);
                        return decl;
                    }
                    if (typeof value === 'string') return 'string';
                    if (typeof value === 'number') return 'number';
                    if (typeof value === 'boolean') return 'boolean';
                    return 'unknown';
                }
                function objectDeclaration(obj, suggestedName) {
                    if (Array.isArray(obj)) return typeFor(obj, suggestedName);
                    const name = jsonTsSafeName(suggestedName, 'NestedType');
                    const signature = JSON.stringify(obj);
                    if (seen.has(signature)) return seen.get(signature);
                    let uniqueName = name;
                    let suffix = 2;
                    while (usedNames.has(uniqueName)) uniqueName = `${name}${suffix++}`;
                    usedNames.add(uniqueName);
                    seen.set(signature, uniqueName);
                    const props = Object.entries(obj).map(([key, value]) => {
                        const optional = document.getElementById('json-ts-optional')?.checked ? '?' : '';
                        const readonly = document.getElementById('json-ts-readonly')?.checked ? 'readonly ' : '';
                        const childName = key.replace(/[^A-Za-z0-9_$]/g, ' ').replace(/\s+([a-zA-Z0-9_$])/g, (_, c) => c.toUpperCase()).replace(/\s/g, '');
                        return `  ${readonly}${jsonTsProperty(key)}${optional}: ${typeFor(value, childName || 'NestedType')};`;
                    });
                    const prefix = useExport ? 'export ' : '';
                    const declaration = style === 'type'
                        ? `${prefix}type ${uniqueName} = {\n${props.join('\n')}\n};`
                        : `${prefix}interface ${uniqueName} {\n${props.join('\n')}\n}`;
                    declarations.push(declaration);
                    return uniqueName;
                }
                let rootType;
                if (Array.isArray(data)) {
                    if (!data.length) rootType = 'unknown[]';
                    else {
                        const types = [...new Set(data.map(item => typeFor(item, rootName + 'Item')))];
                        rootType = types.join(' | ');
                        if (types.length > 1) rootType = `(${rootType})`;
                        rootType += '[]';
                    }
                    declarations.unshift(`${useExport ? 'export ' : ''}type ${rootName} = ${rootType};`);
                } else {
                    objectDeclaration(data, rootName);
                }
                jsonTsLastOutput = declarations.join('\n\n');
                output.textContent = jsonTsLastOutput || '// No TypeScript output generated.';
            } catch (e) {
                jsonTsLastOutput = '';
                output.textContent = '// Fix the JSON input to generate TypeScript.';
                if (error) error.textContent = `Could not parse JSON: ${e.message}`;
            }
        }
        function loadJsonTsSample() {
            const sample = {
                id: 1042, name: 'Ava Taylor', active: true, role: 'creator',
                profile: { website: 'https://example.com', followers: 12800, verified: false },
                tags: ['design', 'marketing'],
                projects: [{ title: 'Launch campaign', budget: 2500, status: 'active' }, { title: 'Brand refresh', budget: 1800, status: 'planned' }],
                lastLogin: null
            };
            document.getElementById('json-ts-input').value = JSON.stringify(sample, null, 2);
            updateJsonTsStats();
            convertJsonToTs(false);
        }
        function clearJsonTs() {
            document.getElementById('json-ts-input').value = '';
            jsonTsLastOutput = '';
            document.getElementById('json-ts-output').textContent = '// Generated TypeScript will appear here';
            const error = document.getElementById('json-ts-error'); if (error) error.textContent = '';
            updateJsonTsStats();
        }
        async function copyJsonTsOutput() {
            if (!jsonTsLastOutput) return;
            try { await navigator.clipboard.writeText(jsonTsLastOutput); alert('TypeScript copied.'); }
            catch (e) { alert('Copy was blocked by the browser. Select the output and copy it manually.'); }
        }
        function downloadJsonTs() {
            if (!jsonTsLastOutput) return;
            const blob = new Blob([jsonTsLastOutput], { type: 'text/typescript;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'generated-types.ts';
            document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        let svgOptimizedMarkup = '';
        let svgPreviewUrl = '';

        function svgByteLength(text) {
            return new Blob([text], { type: 'image/svg+xml;charset=utf-8' }).size;
        }
        function svgFormatBytes(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
        function updateSvgInputStats() {
            const input = document.getElementById('svg-input');
            const text = input ? input.value : '';
            const stats = document.getElementById('svg-input-stats');
            if (stats) stats.textContent = `${text.length.toLocaleString()} characters · ${svgFormatBytes(svgByteLength(text))}`;
        }
        function handleSvgDrag(event, active) {
            event.preventDefault();
            event.stopPropagation();
            const zone = document.getElementById('svg-dropzone');
            if (!zone) return;
            zone.style.borderColor = active ? 'var(--accent)' : 'var(--border-color, #666)';
            zone.style.background = active ? 'rgba(127,127,127,.13)' : 'rgba(127,127,127,.04)';
        }
        function handleSvgDrop(event) {
            handleSvgDrag(event, false);
            const files = event.dataTransfer && event.dataTransfer.files;
            if (!files || !files.length) return;
            loadSvgFile({ target: { files: [files[0]], value: '' } });
        }
        function loadSvgFile(event) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;
            const status = document.getElementById('svg-status');
            const fileLabel = document.getElementById('svg-dropzone-file');
            if (!/\.svg$/i.test(file.name) && file.type !== 'image/svg+xml') {
                status.textContent = 'Please drop or choose an SVG file.';
                if (event.target) event.target.value = '';
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                status.textContent = 'That SVG is over 5 MB. Please choose a smaller file.';
                if (event.target) event.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById('svg-input').value = String(reader.result || '');
                status.textContent = 'SVG loaded. Review the cleaning options, then optimize.';
                if (fileLabel) fileLabel.textContent = `Loaded: ${file.name} · ${svgFormatBytes(file.size)}`;
                updateSvgInputStats();
            };
            reader.onerror = () => { status.textContent = 'Could not read this file. Please try another SVG.'; };
            reader.readAsText(file);
        }
        function optimizeSvg() {
            const source = document.getElementById('svg-input').value.trim();
            const status = document.getElementById('svg-status');
            if (!source) { status.textContent = 'Paste SVG markup or open an SVG file first.'; return; }
            if (source.length > 5 * 1024 * 1024) { status.textContent = 'This SVG is over 5 MB. Please use a smaller file.'; return; }
            if (!window.DOMParser || !window.XMLSerializer) { status.textContent = 'This browser does not support the XML tools needed to clean SVG.'; return; }
            try {
                if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(source)) throw new Error('SVG documents with DTDs or entities are not supported.');
                const parser = new DOMParser();
                const doc = parser.parseFromString(source, 'image/svg+xml');
                if (doc.querySelector('parsererror')) throw new Error('The markup is not valid XML. Check for missing tags, unescaped ampersands, or mismatched quotes.');
                const root = doc.documentElement;
                if (!root || root.localName.toLowerCase() !== 'svg' || root.namespaceURI !== 'http://www.w3.org/2000/svg') {
                    throw new Error('The input must be a complete SVG document with an <svg> root element.');
                }
                const removeComments = document.getElementById('svg-remove-comments').checked;
                const removeMetadata = document.getElementById('svg-remove-metadata').checked;
                const removeTitleDesc = document.getElementById('svg-remove-title-desc').checked;
                const minify = document.getElementById('svg-minify-whitespace').checked;
                const walker = doc.createTreeWalker(root, NodeFilter.SHOW_ALL);
                const nodesToRemove = [];
                let node = root;
                while (node) {
                    if (removeComments && node.nodeType === Node.COMMENT_NODE) nodesToRemove.push(node);
                    else if (node.nodeType === Node.ELEMENT_NODE) {
                        const localName = (node.localName || '').toLowerCase();
                        if (['script','foreignobject','iframe','object','embed','animate','animatemotion','animatetransform','set'].includes(localName)) nodesToRemove.push(node);
                        else if (localName === 'style' && /@import\b|url\(\s*['"]?\s*(?:https?:|\/\/|javascript:|data:)/i.test(node.textContent || '')) nodesToRemove.push(node);
                        else if (removeTitleDesc && ['title', 'desc'].includes(localName)) nodesToRemove.push(node);
                        else if (removeMetadata && ['metadata'].includes(localName)) nodesToRemove.push(node);
                        else if (node.attributes) {
                            for (let i = node.attributes.length - 1; i >= 0; i--) {
                                const attr = node.attributes[i];
                                const attrName = (attr.name || '').toLowerCase();
                                const attrNs = attr.namespaceURI || '';
                                const v = (attr.value || '').trim();
                                const externalReference = (attrName === 'href' || attrName.endsWith(':href')) && v && !v.startsWith('#') && !/^data:image\/(?:png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(v);
                                const dangerousUrl = /url\(\s*['"]?\s*(?:https?:|\/\/|javascript:|data:)/i.test(v) || /^\s*javascript:/i.test(v);
                                const editorMetadata = removeMetadata && (attrNs.includes('inkscape') || attrNs.includes('sodipodi') || attrName.startsWith('inkscape:') || attrName.startsWith('sodipodi:'));
                                if (attrName.startsWith('on') || externalReference || dangerousUrl || editorMetadata) node.removeAttributeNode(attr);
                            }
                        }
                    }
                    node = walker.nextNode();
                }
                nodesToRemove.forEach(n => { if (n.parentNode) n.parentNode.removeChild(n); });
                let output = new XMLSerializer().serializeToString(doc);
                if (minify) output = output.replace(/>\s+</g, '><').trim();
                if (!/^<svg(?:\s|>)/i.test(output) && !output.includes('<svg')) throw new Error('Could not serialize the SVG markup safely.');
                svgOptimizedMarkup = output;
                document.getElementById('svg-output').value = output;
                document.getElementById('svg-results').style.display = 'block';
                const originalBytes = svgByteLength(source), optimizedBytes = svgByteLength(output);
                const delta = originalBytes ? ((originalBytes - optimizedBytes) / originalBytes) * 100 : 0;
                document.getElementById('svg-original-size').textContent = svgFormatBytes(originalBytes);
                document.getElementById('svg-optimized-size').textContent = svgFormatBytes(optimizedBytes);
                document.getElementById('svg-savings').textContent = delta >= 0 ? `${delta.toFixed(1)}% smaller` : `${Math.abs(delta).toFixed(1)}% larger`;
                if (svgPreviewUrl) URL.revokeObjectURL(svgPreviewUrl);
                svgPreviewUrl = URL.createObjectURL(new Blob([output], { type: 'image/svg+xml;charset=utf-8' }));
                document.getElementById('svg-preview').src = svgPreviewUrl;
                status.textContent = 'SVG cleaned successfully. Scripts, event handlers and unsafe external references are removed. Review the result before downloading.';
                updateSvgInputStats();
            } catch (error) {
                status.textContent = error && error.message ? error.message : 'Could not clean this SVG. Check the markup and try again.';
                document.getElementById('svg-results').style.display = 'none';
                svgOptimizedMarkup = '';
            }
        }
        async function copySvgOutput() {
            if (!svgOptimizedMarkup) return;
            try { await navigator.clipboard.writeText(svgOptimizedMarkup); document.getElementById('svg-status').textContent = 'Cleaned SVG copied to clipboard.'; }
            catch (e) { document.getElementById('svg-status').textContent = 'Clipboard access was blocked. Select the output and copy it manually.'; }
        }
        function downloadSvgOutput() {
            if (!svgOptimizedMarkup) return;
            const blob = new Blob([svgOptimizedMarkup], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'optimized.svg';
            document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        function loadSvgSample() {
            document.getElementById('svg-input').value = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">\n  <!-- Sample badge -->\n  <metadata>Editor metadata</metadata>\n  <rect x="4" y="4" width="112" height="72" rx="12" fill="#10b981"/>\n  <circle cx="42" cy="40" r="18" fill="#ffffff"/>\n  <path d="M68 28h30v6H68zm0 12h24v6H68z" fill="#ffffff"/>\n</svg>`;
            document.getElementById('svg-results').style.display = 'none';
            document.getElementById('svg-status').textContent = 'Sample loaded. Click Clean & Optimize to see the result.';
            updateSvgInputStats();
        }
        function resetSvgTool() {
            document.getElementById('svg-input').value = '';
            document.getElementById('svg-output').value = '';
            document.getElementById('svg-file').value = '';
            const dropLabel = document.getElementById('svg-dropzone-file');
            if (dropLabel) dropLabel.textContent = '';
            document.getElementById('svg-results').style.display = 'none';
            document.getElementById('svg-status').textContent = '';
            svgOptimizedMarkup = '';
            if (svgPreviewUrl) { URL.revokeObjectURL(svgPreviewUrl); svgPreviewUrl = ''; }
            document.getElementById('svg-preview').removeAttribute('src');
            updateSvgInputStats();
        }

        // Multi-Platform Social Hook Previewer Logic
        let currentPlatform = 'x';
        let socialHookAvatarData = '';
        const socialHookPlatforms = {
            x: { threshold: 280, guidance: 'X-style post preview: compact header, clean text-first layout and engagement row. Standard posts are generally limited to 280 characters.' },
            linkedin: { threshold: 210, guidance: 'LinkedIn-style feed card with professional profile details and an engagement bar. The “see more” cut-off varies by device and post format.' },
            instagram: { threshold: 125, guidance: 'Instagram-style feed caption with a profile row and action icons. The opening line is especially important before the caption expands.' },
            tiktok: { threshold: 2200, guidance: 'TikTok-style For You video preview with mobile and desktop layouts. Engagement numbers are illustrative.' },
            facebook: { threshold: 200, guidance: 'Facebook-style feed card with profile details, post copy and Like/Comment/Share actions. Visible text varies by placement and device.' },
            youtube: { threshold: 150, guidance: 'YouTube Community-style post card with channel identity and engagement actions. This is not a video watch-page preview.' }
        };

        let xPostMediaData = '';
        let linkedInMediaData = '';
        let linkedInExpanded = false;
        function clearXPostMedia() {
            xPostMediaData = '';
            const f = document.getElementById('x-media-file'); if(f) f.value = '';
            document.getElementById('x-media-file-name').textContent = 'No image attached';
            updateMultiPlatformPreview();
        }
        function loadXPostMedia(file) {
            if (!file) return;
            if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { alert('Choose a JPG, PNG or WebP image.'); return; }
            if (file.size > 8 * 1024 * 1024) { alert('Choose an image under 8 MB.'); return; }
            const reader = new FileReader();
            reader.onload = () => { xPostMediaData = reader.result; document.getElementById('x-media-file-name').textContent = file.name; updateMultiPlatformPreview(); };
            reader.onerror = () => alert('Could not load the image.');
            reader.readAsDataURL(file);
        }
        function initXPostMediaDropzone() {
            const zone = document.getElementById('x-media-dropzone');
            const input = document.getElementById('x-media-file');
            if (!zone || !input) return;
            zone.addEventListener('click', () => input.click());
            zone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
            input.addEventListener('change', () => loadXPostMedia(input.files[0]));
            zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = '#1d9bf0'; });
            zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
            zone.addEventListener('drop', e => { e.preventDefault(); zone.style.borderColor = ''; loadXPostMedia(e.dataTransfer.files[0]); });
        }
        document.addEventListener('DOMContentLoaded', () => { if(document.getElementById('tool-socialhook')) initXPostMediaDropzone(); });

        function clearLinkedInMedia() {
            linkedInMediaData = '';
            const f = document.getElementById('li-media-file'); if (f) f.value = '';
            document.getElementById('li-media-file-name').textContent = 'No image attached';
            updateMultiPlatformPreview();
        }
        function loadLinkedInMedia(file) {
            if (!file) return;
            if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { alert('Choose a JPG, PNG or WebP image.'); return; }
            if (file.size > 8 * 1024 * 1024) { alert('Choose an image under 8 MB.'); return; }
            const reader = new FileReader();
            reader.onload = () => { linkedInMediaData = reader.result; document.getElementById('li-media-file-name').textContent = file.name; updateMultiPlatformPreview(); };
            reader.onerror = () => alert('Could not read the image.');
            reader.readAsDataURL(file);
        }
        function initLinkedInMediaDropzone() {
            const zone = document.getElementById('li-media-dropzone'), input = document.getElementById('li-media-file');
            if (!zone || !input || zone.dataset.ready) return;
            zone.dataset.ready = '1';
            zone.addEventListener('click', e => { if (e.target !== input) input.click(); });
            zone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
            input.addEventListener('change', () => loadLinkedInMedia(input.files[0]));
            zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
            zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
            zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('dragover'); loadLinkedInMedia(e.dataTransfer.files[0]); });
        }
        document.addEventListener('DOMContentLoaded', () => { if(document.getElementById('tool-socialhook')) initLinkedInMediaDropzone(); });
        function toggleLinkedInExpanded() { linkedInExpanded = !linkedInExpanded; updateMultiPlatformPreview(); }
        function renderLinkedInPreview(name, initials, text) {
            const shell = document.getElementById('li-native-shell');
            if (!shell) return;
            const mobile = document.getElementById('li-device').value === 'mobile';
            shell.classList.toggle('li-mobile', mobile);
            shell.classList.toggle('li-dark', document.getElementById('li-theme').value === 'dark');
            document.getElementById('li-author-name').textContent = name;
            document.getElementById('li-headline').textContent = document.getElementById('li-headline-input').value.trim() || 'Professional headline';
            document.getElementById('li-follow-button').style.display = document.getElementById('li-follow').checked ? '' : 'none';
            renderSocialHookAvatar(document.getElementById('li-avatar'), initials);
            const collapse = document.getElementById('li-collapse').checked;
            const limit = mobile ? 125 : 225;
            const tooLong = collapse && text.length > limit;
            document.getElementById('li-post-text').textContent = !text.trim() ? 'Your LinkedIn post will appear here.' : tooLong && !linkedInExpanded ? text.slice(0, limit).trimEnd() : text;
            const more = document.getElementById('li-more-button');
            more.hidden = !tooLong;
            more.textContent = linkedInExpanded ? ' show less' : '…more';
            const media = document.getElementById('li-post-image');
            media.classList.toggle('li-visible', !!linkedInMediaData);
            if (linkedInMediaData) media.src = linkedInMediaData; else media.removeAttribute('src');
        }
        // Facebook-only feed renderer. All user content is inserted as text.
        let facebookMediaData = '';
        let facebookExpanded = false;
        function toggleFacebookExpanded() { facebookExpanded = !facebookExpanded; updateMultiPlatformPreview(); }
        function clearFacebookMedia() {
            facebookMediaData = '';
            const input = document.getElementById('fb-media-file'); if (input) input.value = '';
            document.getElementById('fb-media-file-name').textContent = 'No photo selected';
            updateMultiPlatformPreview();
        }
        function loadFacebookMedia(file) {
            if (!file) return;
            if (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 8*1024*1024) { alert('Choose a JPG, PNG or WebP image under 8 MB.'); return; }
            const reader = new FileReader();
            reader.onload = () => { facebookMediaData = reader.result; document.getElementById('fb-media-file-name').textContent = file.name + ' · ' + Math.round(file.size/1024) + ' KB'; updateMultiPlatformPreview(); };
            reader.onerror = () => alert('Could not read this image.');
            reader.readAsDataURL(file);
        }
        function initFacebookDropzone() {
            const zone = document.getElementById('fb-media-dropzone'), input = document.getElementById('fb-media-file');
            if (!zone || zone.dataset.ready) return;
            zone.dataset.ready = '1';
            zone.addEventListener('click', e => { if (e.target !== input) input.click(); });
            zone.addEventListener('keydown', e => { if (e.target === zone && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); input.click(); } });
            input.addEventListener('click', e => e.stopPropagation());
            input.addEventListener('change', () => loadFacebookMedia(input.files[0]));
            ['dragenter','dragover'].forEach(t => zone.addEventListener(t, e => { e.preventDefault(); e.stopPropagation(); zone.classList.add('dragover'); }));
            ['dragleave','drop'].forEach(t => zone.addEventListener(t, e => { e.preventDefault(); e.stopPropagation(); zone.classList.remove('dragover'); }));
            zone.addEventListener('drop', e => loadFacebookMedia(e.dataTransfer && e.dataTransfer.files[0]));
        }
        function renderFacebookPreview(name, initials, text) {
            const shell = document.getElementById('fb-native-shell');
            const mobile = document.getElementById('fb-device').value === 'mobile';
            shell.classList.toggle('fb-mobile', mobile);
            shell.classList.toggle('fb-dark', document.getElementById('fb-theme').value === 'dark');
            document.getElementById('fb-name').textContent = name;
            renderSocialHookAvatar(document.getElementById('fb-avatar'), initials);
            const mini = document.querySelector('#fb-native-shell .fb-small-avatar');
            renderSocialHookAvatar(mini, initials);
            const location = document.getElementById('fb-location').value.trim();
            const locationEl = document.getElementById('fb-location-text');
            locationEl.hidden = !location;
            locationEl.textContent = location ? 'at ' + location + ' · ' : '';
            document.getElementById('fb-badge').hidden = !document.getElementById('fb-verified').checked;
            const limit = mobile ? 170 : 320;
            const shortened = document.getElementById('fb-collapse').checked && text.length > limit;
            const caption = document.getElementById('fb-caption');
            caption.textContent = !text.trim() ? 'Your Facebook post will appear here.' : shortened && !facebookExpanded ? text.slice(0, limit).trimEnd() + '… ' : text;
            const more = document.getElementById('fb-more');
            more.hidden = !shortened;
            more.textContent = facebookExpanded ? 'See less' : 'See more';
            const area = document.getElementById('fb-media-area'), img = document.getElementById('fb-media-img');
            area.hidden = !facebookMediaData;
            if (facebookMediaData) img.src = facebookMediaData; else img.removeAttribute('src');
        }
        function switchPlatformPreview(platform, btnElement) {
            currentPlatform = platform;
            linkedInExpanded = false;
            facebookExpanded = false;
            document.querySelectorAll('#tool-socialhook .platform-tab').forEach(t => t.classList.remove('active'));
            if (btnElement) btnElement.classList.add('active');
            updateMultiPlatformPreview();
        }

        function renderSocialHookAvatar(el, initials) {
            if (!el) return;
            el.innerHTML = '';
            if (socialHookAvatarData) {
                const img = document.createElement('img'); img.src = socialHookAvatarData; img.alt = 'Profile photo'; el.appendChild(img);
            } else { el.textContent = initials; }
        }


        // Instagram-only feed preview; other platforms remain independent.
        let instagramMedia = [];
        let instagramSlide = 0;
        let instagramExpanded = false;
        function clearInstagramMedia() {
            instagramMedia = []; instagramSlide = 0;
            const f = document.getElementById('ig-media-file'); if(f) f.value = '';
            document.getElementById('ig-media-file-name').textContent = 'No photos selected';
            updateMultiPlatformPreview();
        }
        function loadInstagramMedia(files) {
            const images = Array.from(files || []);
            if (!images.length) return;
            if (images.length > 10) { alert('Choose up to 10 photos.'); return; }
            if (images.some(f => !/^image\/(png|jpeg|webp)$/.test(f.type) || f.size > 8*1024*1024)) { alert('Use JPG, PNG or WebP images under 8 MB each.'); return; }
            Promise.all(images.map(f => new Promise((resolve,reject) => {
                const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(f);
            }))).then(data => {
                instagramMedia = data; instagramSlide = 0;
                document.getElementById('ig-media-file-name').textContent = `${data.length} photo${data.length===1?'':'s'} selected`;
                updateMultiPlatformPreview();
            }).catch(() => alert('Could not load the selected photos.'));
        }
        function initInstagramDropzone() {
            const zone = document.getElementById('ig-media-dropzone'); const file = document.getElementById('ig-media-file');
            if (!zone || zone.dataset.ready) return; zone.dataset.ready = '1';
            zone.addEventListener('click', e => { if (e.target !== file) file.click(); });
            zone.addEventListener('keydown', e => { if (e.target===zone && (e.key==='Enter'||e.key===' ')) {e.preventDefault();file.click();} });
            file.addEventListener('click', e => e.stopPropagation());
            file.addEventListener('change', () => loadInstagramMedia(file.files));
            ['dragenter','dragover'].forEach(t => zone.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();if(e.dataTransfer)e.dataTransfer.dropEffect='copy';zone.classList.add('dragover');}));
            ['dragleave','drop'].forEach(t => zone.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();zone.classList.remove('dragover');}));
            zone.addEventListener('drop', e => { const dropped=e.dataTransfer && e.dataTransfer.files; if(dropped) loadInstagramMedia(dropped); });
        }
        function instagramMoveSlide(direction) {
            if (!instagramMedia.length) return;
            instagramSlide = (instagramSlide + direction + instagramMedia.length) % instagramMedia.length;
            updateMultiPlatformPreview();
        }
        function toggleInstagramCaption() {instagramExpanded = !instagramExpanded;updateMultiPlatformPreview();}
        function renderInstagramPreview(name, handle, initials, text) {
            const shell = document.getElementById('ig-native-shell');
            shell.classList.toggle('ig-mobile',document.getElementById('ig-device').value==='mobile');
            shell.classList.toggle('ig-desktop',document.getElementById('ig-device').value==='desktop');
            shell.classList.toggle('ig-dark',document.getElementById('ig-theme').value==='dark');
            const username = handle.replace(/^@/,'') || 'username';
            document.getElementById('ig-username').textContent = username;
            document.getElementById('ig-verified-badge').hidden = !document.getElementById('ig-verified-toggle').checked;
            document.getElementById('ig-caption-user').textContent = username;
            renderSocialHookAvatar(document.getElementById('ig-avatar'),initials);
            const location = document.getElementById('ig-location').value.trim();
            const loc = document.getElementById('ig-location-text'); loc.hidden = !location; loc.textContent = location;
            const media = document.getElementById('ig-photo');
            const empty = document.getElementById('ig-empty-media');
            media.hidden = !instagramMedia.length; empty.hidden = !!instagramMedia.length;
            if (instagramMedia.length) media.src = instagramMedia[instagramSlide]; else media.removeAttribute('src');
            const stage = document.getElementById('ig-media-stage');
            stage.style.aspectRatio = document.getElementById('ig-image-ratio').value;
            const multiple = instagramMedia.length>1;
            const counter = document.getElementById('ig-slide-count');counter.hidden=!multiple;counter.textContent=`${instagramSlide+1}/${instagramMedia.length}`;
            document.getElementById('ig-prev').hidden = !multiple;
            document.getElementById('ig-next').hidden = !multiple;
            const dots = document.getElementById('ig-dots');dots.replaceChildren();
            if(multiple) for(let i=0;i<Math.min(instagramMedia.length,10);i++) {const dot=document.createElement('b');if(i===instagramSlide)dot.className='active';dots.appendChild(dot);}
            const cut = document.getElementById('ig-collapse').checked && !instagramExpanded && text.length>125;
            document.getElementById('ig-caption-text').textContent = text.trim() ? (cut?text.slice(0,125).trimEnd()+'…':text) : 'Your caption will appear here.';
            const more = document.getElementById('ig-more-button');more.hidden = !cut && !instagramExpanded;
            more.textContent = instagramExpanded ? 'less' : 'more';
        }


        // TikTok video-first preview and local drag/drop media handling.
        let tiktokMediaUrl = '';
        let tiktokMediaType = '';
        let tiktokDropReady = false;
        function clearTikTokMedia() {
            const video = document.getElementById('tt-video');
            if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
            if (tiktokMediaUrl) URL.revokeObjectURL(tiktokMediaUrl);
            tiktokMediaUrl = ''; tiktokMediaType = '';
            const input = document.getElementById('tt-media-file'); if(input) input.value='';
            const label = document.getElementById('tt-media-file-name'); if(label) label.textContent='No media selected';
            updateMultiPlatformPreview();
        }
        function loadTikTokMedia(file) {
            if (!file) return;
            const accepted = ['video/mp4','video/webm','video/quicktime','image/jpeg','image/png','image/webp'];
            if (!accepted.includes(file.type)) { alert('Please use MP4, WebM, MOV, JPG, PNG or WebP.'); return; }
            if (file.size > 50 * 1024 * 1024) { alert('Choose a file smaller than 50 MB.'); return; }
            const video = document.getElementById('tt-video');
            video.pause(); video.removeAttribute('src'); video.load();
            if (tiktokMediaUrl) URL.revokeObjectURL(tiktokMediaUrl);
            tiktokMediaUrl = URL.createObjectURL(file);
            tiktokMediaType = file.type.startsWith('video/') ? 'video' : 'image';
            video.muted = false; // A user-initiated upload may enable sound; playback still requires a click.
            video.volume = 1;
            document.getElementById('tt-media-file-name').textContent = file.name + ' · ' + (file.size / 1048576).toFixed(1) + ' MB';
            updateMultiPlatformPreview();
        }
        function initTikTokDropzone() {
            if (tiktokDropReady) return;
            const zone = document.getElementById('tt-media-dropzone');
            const input = document.getElementById('tt-media-file');
            if (!zone || !input) return;
            tiktokDropReady = true;
            zone.addEventListener('click',e=>{if(e.target !== input) input.click();});
            zone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click();}});
            input.addEventListener('change',()=>loadTikTokMedia(input.files[0]));
            ['dragenter','dragover'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();e.stopPropagation();zone.classList.add('dragover');if(e.dataTransfer)e.dataTransfer.dropEffect='copy';}));
            ['dragleave','drop'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();e.stopPropagation();zone.classList.remove('dragover');}));
            zone.addEventListener('drop',e=>{if(e.dataTransfer && e.dataTransfer.files.length)loadTikTokMedia(e.dataTransfer.files[0]);});
        }
        function toggleTikTokAudio() {
            const video = document.getElementById('tt-video');
            if (!video || !tiktokMediaUrl || tiktokMediaType !== 'video') return;
            video.muted = !video.muted;
            updateTikTokAudioButton();
            if (video.paused) video.play().catch(() => {});
        }
        function updateTikTokAudioButton() {
            const video = document.getElementById('tt-video');
            const button = document.getElementById('tt-audio-toggle');
            if (!video || !button) return;
            button.hidden = tiktokMediaType !== 'video';
            button.innerHTML = video.muted ? '<i class="fa-solid fa-volume-xmark"></i><span>Sound off</span>' : '<i class="fa-solid fa-volume-high"></i><span>Sound on</span>';
            button.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
        }
        function renderTikTokPreview(initials, handle, text) {
            const shell = document.getElementById('tt-native-shell');
            const device = document.getElementById('tt-device').value;
            shell.classList.toggle('tt-mobile',device==='mobile');
            shell.classList.toggle('tt-desktop',device==='desktop');
            shell.classList.toggle('tt-light',document.getElementById('tt-theme').value==='light');
            renderSocialHookAvatar(document.getElementById('tt-avatar'),initials);
            document.getElementById('tt-username').textContent = handle;
            document.getElementById('tt-badge').hidden = !document.getElementById('tt-verified').checked;
            document.getElementById('tt-caption').textContent = text.trim() || 'Your caption will appear here.';
            document.getElementById('tt-sound-text').textContent = (document.getElementById('tt-sound').value.trim() || 'original sound') + ' - ' + handle.replace(/^@/,'');
            const photo = document.getElementById('tt-photo');
            const video = document.getElementById('tt-video');
            photo.hidden = tiktokMediaType !== 'image';
            video.hidden = tiktokMediaType !== 'video';
            document.getElementById('tt-empty').hidden = !!tiktokMediaUrl;
            if (tiktokMediaType === 'image' && photo.src !== tiktokMediaUrl) photo.src = tiktokMediaUrl;
            if (tiktokMediaType === 'video' && video.src !== tiktokMediaUrl) video.src = tiktokMediaUrl;
            video.loop = document.getElementById('tt-loop').checked;
            updateTikTokAudioButton();
        }


        // YouTube Community post: independent preview, no external uploads.
        let youtubeMediaUrl = '';
        let youtubeExpanded = false;
        function clearYouTubeMedia() {
            if (youtubeMediaUrl) URL.revokeObjectURL(youtubeMediaUrl);
            youtubeMediaUrl = '';
            const input=document.getElementById('yt-media-file');if(input)input.value='';
            document.getElementById('yt-media-file-name').textContent='No image selected';
            updateMultiPlatformPreview();
        }
        function loadYouTubeMedia(file) {
            if(!file)return;
            if(!['image/jpeg','image/png','image/webp'].includes(file.type)){alert('Use JPG, PNG or WebP images.');return;}
            if(file.size>8*1024*1024){alert('Please choose an image under 8 MB.');return;}
            if(youtubeMediaUrl)URL.revokeObjectURL(youtubeMediaUrl);
            youtubeMediaUrl=URL.createObjectURL(file);
            document.getElementById('yt-media-file-name').textContent=file.name+' · '+(file.size/1048576).toFixed(1)+' MB';
            updateMultiPlatformPreview();
        }
        function initYouTubeDropzone(){
            const zone=document.getElementById('yt-media-dropzone'),input=document.getElementById('yt-media-file');
            if(!zone||zone.dataset.ready)return;zone.dataset.ready='1';
            zone.addEventListener('click',e=>{if(e.target!==input)input.click();});
            zone.addEventListener('keydown',e=>{if(e.target===zone&&(e.key==='Enter'||e.key===' ')){e.preventDefault();input.click();}});
            input.addEventListener('click',e=>e.stopPropagation());
            input.addEventListener('change',()=>loadYouTubeMedia(input.files[0]));
            ['dragenter','dragover'].forEach(t=>zone.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();zone.classList.add('dragover');if(e.dataTransfer)e.dataTransfer.dropEffect='copy';}));
            ['dragleave','drop'].forEach(t=>zone.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();zone.classList.remove('dragover');}));
            zone.addEventListener('drop',e=>{if(e.dataTransfer&&e.dataTransfer.files.length)loadYouTubeMedia(e.dataTransfer.files[0]);});
        }
        function toggleYouTubeExpanded(){youtubeExpanded=!youtubeExpanded;updateMultiPlatformPreview();}
        function renderYouTubePreview(name,initials,text){
            const shell=document.getElementById('yt-native-shell');
            shell.classList.toggle('yt-mobile',document.getElementById('yt-device').value==='mobile');
            shell.classList.toggle('yt-desktop',document.getElementById('yt-device').value==='desktop');
            shell.classList.toggle('yt-dark',document.getElementById('yt-theme').value==='dark');
            ['yt-avatar','yt-side-you-avatar','yt-mobile-you-avatar','yt-top-you-avatar'].forEach(id => renderSocialHookAvatar(document.getElementById(id),initials));
            document.getElementById('yt-channel-name').textContent=name;
            document.getElementById('yt-verified-badge').hidden=!document.getElementById('yt-verified').checked;
            document.getElementById('yt-subs').textContent=document.getElementById('yt-subscribers').value.trim();
            const truncate=document.getElementById('yt-collapse').checked&&!youtubeExpanded&&text.length>230;
            document.getElementById('yt-post-copy').textContent=text.trim()?(truncate?text.slice(0,230).trimEnd()+'…':text):'Your Community post will appear here.';
            const more=document.getElementById('yt-read-more');more.hidden=!(text.length>230);more.textContent=youtubeExpanded?'Show less':'Read more';
            const media=document.getElementById('yt-post-media');media.hidden=!youtubeMediaUrl;
            if(youtubeMediaUrl&&document.getElementById('yt-post-image').src!==youtubeMediaUrl)document.getElementById('yt-post-image').src=youtubeMediaUrl;
        }

        function updateMultiPlatformPreview() {
            const input = document.getElementById('hook-input');
            if (!input) return;
            const text = input.value;
            const previewContent = document.getElementById('mock-preview-content');
            const handleEl = document.getElementById('mock-platform-handle');
            const name = (document.getElementById('hook-display-name').value || 'Your name').trim();
            let handle = (document.getElementById('hook-handle').value || '@username').trim();
            if (handle && !handle.startsWith('@')) handle = '@' + handle;
            const initials = (document.getElementById('hook-avatar').value || name.split(/\s+/).map(w => w[0] || '').join('').slice(0,2) || 'U').trim().slice(0,3).toUpperCase();
            const config = socialHookPlatforms[currentPlatform] || socialHookPlatforms.x;
            const count = text.length;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            document.getElementById('hook-live-stats').textContent = `${count.toLocaleString()} characters · ${words.toLocaleString()} words`;
            renderSocialHookAvatar(document.getElementById('mock-avatar'), initials);
            renderSocialHookAvatar(document.getElementById('hook-avatar-drop-preview'), initials);
            document.getElementById('mock-name').textContent = name;
            const verified = document.querySelector('#mock-name .fa-circle-check');
            if (verified) verified.style.display = currentPlatform === 'x' || currentPlatform === 'linkedin' || currentPlatform === 'youtube' ? 'inline-block' : 'none';
            handleEl.textContent = currentPlatform === 'linkedin' ? `${handle} · 1st` : currentPlatform === 'youtube' ? `${handle} · 1 hour ago` : currentPlatform === 'instagram' ? handle : currentPlatform === 'tiktok' ? `${handle} · original sound` : `${handle} · 1h`;
            const mockCounter = document.getElementById('mock-char-counter');
            if (mockCounter) mockCounter.textContent = count ? `${count.toLocaleString()} chars` : '';
            const card = document.querySelector('#tool-socialhook .mock-card');
            card.className = `mock-card platform-${currentPlatform}`;
            const visible = text.slice(0, config.threshold);
            previewContent.textContent = !text.trim() ? (currentPlatform === 'instagram' ? 'Add a caption to preview it below the post controls.' : currentPlatform === 'tiktok' ? 'Your caption will appear over the video preview.' : currentPlatform === 'youtube' ? 'Write a Community post to preview it here.' : 'Your post preview will appear here.') : visible + (count > config.threshold ? ' … see more' : '');
            const guidance = document.getElementById('hook-platform-guidance');
            const over = currentPlatform === 'x' && count > 280;
            guidance.textContent = `${config.guidance}${text.trim() ? ` Current caption: ${count} characters${over ? ' — over the standard 280-character limit.' : count > config.threshold ? ' — this mock preview truncates the caption.' : '.'}` : ''}`;
            const xMode = currentPlatform === 'x';
            const xPreview = document.getElementById('x-native-preview');
            const xGeneric = document.querySelector('#tool-socialhook .mock-card');
            if (xPreview) xPreview.style.display = xMode ? 'block' : 'none';
            const ttMode = currentPlatform === 'tiktok';
            document.getElementById('tt-native-shell').style.display = ttMode ? 'block' : 'none';
            document.getElementById('tt-preview-options').style.display = ttMode ? 'flex' : 'none';
            document.getElementById('tt-editor-options').style.display = ttMode ? 'block' : 'none';
            if (ttMode) { initTikTokDropzone(); renderTikTokPreview(initials, handle, text); }
            const igMode = currentPlatform === 'instagram';
            const igShell = document.getElementById('ig-native-shell');
            igShell.style.display = igMode ? 'block' : 'none';
            document.getElementById('ig-preview-options').style.display = igMode ? 'flex' : 'none';
            document.getElementById('ig-editor-options').style.display = igMode ? 'block' : 'none';
            if (igMode) { initInstagramDropzone(); renderInstagramPreview(name, handle, initials, text); }
            const fbMode = currentPlatform === 'facebook';
            document.getElementById('fb-native-shell').style.display = fbMode ? 'block' : 'none';
            document.getElementById('fb-preview-options').style.display = fbMode ? 'flex' : 'none';
            document.getElementById('fb-editor-options').style.display = fbMode ? 'block' : 'none';
            if (fbMode) { initFacebookDropzone(); renderFacebookPreview(name, initials, text); }
            const ytMode = currentPlatform === 'youtube';
            document.getElementById('yt-native-shell').style.display = ytMode ? 'block' : 'none';
            document.getElementById('yt-preview-options').style.display = ytMode ? 'flex' : 'none';
            document.getElementById('yt-editor-options').style.display = ytMode ? 'block' : 'none';
            if (ytMode) { initYouTubeDropzone(); renderYouTubePreview(name, initials, text); }
            const liMode = currentPlatform === 'linkedin';
            if (xGeneric) xGeneric.style.display = xMode || liMode || igMode || ttMode || fbMode || ytMode ? 'none' : 'block';
            const liShell = document.getElementById('li-native-shell');
            if (liShell) liShell.style.display = liMode ? 'block' : 'none';
            document.getElementById('li-preview-options').style.display = liMode ? 'flex' : 'none';
            document.getElementById('li-editor-options').style.display = liMode ? 'block' : 'none';
            if (liMode) renderLinkedInPreview(name, initials, text);
            document.getElementById('x-preview-options').style.display = xMode ? 'flex' : 'none';
            document.getElementById('x-media-editor').style.display = xMode ? 'block' : 'none';
            if (xMode) {
                xPreview.classList.toggle('x-dark', document.getElementById('x-preview-theme').value === 'dark');
                xPreview.classList.toggle('x-mobile', document.getElementById('x-preview-device').value === 'mobile');
                document.getElementById('x-post-name').textContent = name;
                document.getElementById('x-post-handle').textContent = handle;
                document.getElementById('x-post-badge').style.display = document.getElementById('x-preview-verified').checked ? 'inline' : 'none';
                renderSocialHookAvatar(document.getElementById('x-post-avatar'), initials);
                const postText = document.getElementById('x-post-text');
                postText.textContent = text.trim() ? text : 'Your post will appear here.';
                const media = document.getElementById('x-post-media');
                media.hidden = !xPostMediaData;
                if (xPostMediaData) document.getElementById('x-post-media-img').src = xPostMediaData;
            }
            const avatarLabel = document.getElementById('hook-avatar-file-name');
            if (avatarLabel && !socialHookAvatarData) avatarLabel.textContent = 'No photo selected · initials shown by default';
        }

        function clearSocialHookAvatar() {
            socialHookAvatarData = '';
            const file = document.getElementById('hook-avatar-file'); if (file) file.value = '';
            const label = document.getElementById('hook-avatar-file-name'); if (label) label.textContent = 'No photo selected · initials shown by default';
            updateMultiPlatformPreview();
        }

        function loadSocialHookAvatar(file) {
            if (!file) return;
            if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) { alert('Please use a JPG, PNG, WebP or GIF image.'); return; }
            if (file.size > 5 * 1024 * 1024) { alert('Please choose an image smaller than 5 MB.'); return; }
            const reader = new FileReader();
            reader.onload = e => {
                socialHookAvatarData = e.target.result;
                const label = document.getElementById('hook-avatar-file-name'); if (label) label.textContent = `${file.name} · ${(file.size / 1024).toFixed(0)} KB`;
                updateMultiPlatformPreview();
            };
            reader.onerror = () => alert('Could not read that image. Please try another file.');
            reader.readAsDataURL(file);
        }

        function initSocialHookAvatarDropzone() {
            const zone = document.getElementById('hook-avatar-dropzone');
            const fileInput = document.getElementById('hook-avatar-file');
            const browse = document.getElementById('hook-avatar-browse');
            if (!zone || zone.dataset.ready) return;
            zone.dataset.ready = '1';
            zone.addEventListener('click', e => { if (e.target !== browse && e.target !== fileInput) fileInput.click(); });
            zone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } });
            browse.addEventListener('click', e => { e.stopPropagation(); fileInput.click(); });
            fileInput.addEventListener('change', () => loadSocialHookAvatar(fileInput.files && fileInput.files[0]));
            ['dragenter','dragover'].forEach(type => zone.addEventListener(type, e => { e.preventDefault(); e.stopPropagation(); zone.classList.add('dragover'); }));
            ['dragleave','drop'].forEach(type => zone.addEventListener(type, e => { e.preventDefault(); e.stopPropagation(); zone.classList.remove('dragover'); }));
            zone.addEventListener('drop', e => loadSocialHookAvatar(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]));
        }

        async function copySocialHookCaption(button) {
            const text = document.getElementById('hook-input').value;
            if (!text.trim()) { alert('Add a caption before copying.'); return; }
            await copyTextSafe(text, button);
        }

        function downloadSocialHookCaption() {
            const text = document.getElementById('hook-input').value;
            if (!text.trim()) { alert('Add a caption before downloading.'); return; }
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'social-caption.txt'; document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        function loadSocialHookSample() {
            document.getElementById('hook-input').value = `Your content does not need to be louder. It needs to be clearer.\n\nLead with one useful idea, make the benefit obvious, and give people a reason to keep reading.\n\nWhat is one message your audience needs to hear today? #ContentStrategy #Marketing`;
            updateMultiPlatformPreview();
        }

        function resetSocialHook() {
            document.getElementById('hook-input').value = '';
            document.getElementById('hook-display-name').value = 'Matt Taylor';
            document.getElementById('hook-handle').value = '@matttaylorvii';
            document.getElementById('hook-avatar').value = 'MT';
            clearSocialHookAvatar();
            currentPlatform = 'x';
            linkedInExpanded = false;
            instagramExpanded = false;
            clearInstagramMedia();
            clearTikTokMedia();
            document.getElementById('tt-device').value = 'mobile';
            document.getElementById('tt-theme').value = 'dark';
            document.getElementById('tt-loop').checked = true;
            document.getElementById('tt-verified').checked = false;
            document.getElementById('tt-sound').value = 'original sound';
            document.getElementById('ig-location').value = '';
            document.getElementById('ig-device').value = 'mobile';
            document.getElementById('ig-theme').value = 'light';
            document.getElementById('ig-image-ratio').value = '4/5';
            document.getElementById('ig-collapse').checked = true;
            clearLinkedInMedia();
            document.getElementById('li-headline-input').value = 'Marketing & Content Strategy | Building ideas that connect';
            document.getElementById('x-preview-device').value = 'desktop';
            document.getElementById('x-preview-theme').value = 'light';
            document.getElementById('x-preview-verified').checked = false;
            clearXPostMedia();
            document.getElementById('li-device').value = 'desktop';
            document.getElementById('li-theme').value = 'light';
            document.getElementById('li-follow').checked = true;
            document.getElementById('li-collapse').checked = true;
            document.querySelectorAll('#tool-socialhook .platform-tab').forEach((t, i) => t.classList.toggle('active', i === 0));
            updateMultiPlatformPreview();
        }

        // Browser-only palette extraction: weighted RGB clustering in perceptual Lab space.
        let palettePixels = null;
        let paletteImageURL = null;
        let paletteCurrent = [];
        let paletteImageCanvas = null;
        let paletteBusy = false;
        function paletteRGBToLab(r,g,b) {
            const linear = x => { x /= 255; return x > .04045 ? ((x+.055)/1.055)**2.4 : x/12.92; };
            r=linear(r);g=linear(g);b=linear(b);
            let x=(r*.4124564+g*.3575761+b*.1804375)/.95047;
            let y=(r*.2126729+g*.7151522+b*.0721750);
            let z=(r*.0193339+g*.1191920+b*.9503041)/1.08883;
            const f=t=>t>.008856?Math.cbrt(t):7.787037*t+16/116;
            x=f(x);y=f(y);z=f(z);
            return [116*y-16,500*(x-y),200*(y-z)];
        }
        function paletteHex(rgb){return '#'+rgb.map(x=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0')).join('').toUpperCase();}
        function paletteDistance(a,b){return (a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;}
        function paletteReadFile(file){
            if(!file) return;
            if(!/^image\/(jpeg|png|webp|gif)$/.test(file.type)){paletteStatus('Please use a JPG, PNG, WebP or GIF image.');return;}
            if(file.size>15*1024*1024){paletteStatus('This image is over the 15 MB limit.');return;}
            if(paletteBusy)return;
            paletteBusy=true;paletteStatus('Reading image…');
            const url=URL.createObjectURL(file);
            const image=new Image();
            image.onload=()=>{
                try{
                    const maxSide=280,scale=Math.min(1,maxSide/Math.max(image.naturalWidth,image.naturalHeight));
                    const canvas=document.createElement('canvas');
                    canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));
                    canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
                    const ctx=canvas.getContext('2d',{willReadFrequently:true});
                    ctx.drawImage(image,0,0,canvas.width,canvas.height);
                    const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
                    const counts=new Map();
                    // Quantize to five bits/channel to keep clustering responsive.
                    for(let i=0;i<pixels.length;i+=4){
                        if(pixels[i+3]<220)continue;
                        const r=pixels[i]>>3,g=pixels[i+1]>>3,b=pixels[i+2]>>3;
                        const key=(r<<10)|(g<<5)|b;
                        counts.set(key,(counts.get(key)||0)+1);
                    }
                    palettePixels=[...counts].map(([key,count])=>{
                        const rgb=[((key>>10)&31)*8+4,((key>>5)&31)*8+4,(key&31)*8+4];
                        return {rgb,lab:paletteRGBToLab(...rgb),count};
                    });
                    if(!palettePixels.length)throw Error('No opaque pixels found in this image.');
                    if(paletteImageURL)URL.revokeObjectURL(paletteImageURL);
                    paletteImageURL=url;paletteImageCanvas=canvas;
                    document.getElementById('palette-image').src=url;
                    document.getElementById('palette-image-wrap').style.display='block';
                    paletteStatus(file.name+' · '+(file.size/1024/1024).toFixed(2)+' MB · '+image.naturalWidth+' × '+image.naturalHeight);
                    paletteRecalculate();
                }catch(err){URL.revokeObjectURL(url);paletteStatus('Could not analyse this image: '+err.message);}
                finally{paletteBusy=false;}
            };
            image.onerror=()=>{URL.revokeObjectURL(url);paletteBusy=false;paletteStatus('Could not open this image.');};
            image.src=url;
        }
        function extractPalette(){paletteReadFile(document.getElementById('palette-file').files[0]);}
        function paletteStatus(text){document.getElementById('palette-status').textContent=text;}
        function paletteRecalculate(){
            if(!palettePixels||!palettePixels.length)return;
            const count=Number(document.getElementById('palette-count').value);
            const mode=document.getElementById('palette-method').value;
            const merge=document.getElementById('palette-merge').checked;
            const points=palettePixels.map(p=>({...p,weight:p.count*(mode==='vibrant'?(.2+Math.min(2.2,Math.hypot(p.lab[1],p.lab[2])/55)):1)}));
            const seeds=[points.reduce((a,b)=>a.weight>b.weight?a:b)];
            while(seeds.length<count){
                let best=null,bestScore=-1;
                for(const p of points){
                    const d=Math.min(...seeds.map(q=>paletteDistance(p.lab,q.lab)));
                    const score=d*Math.sqrt(p.weight);
                    if(score>bestScore){bestScore=score;best=p;}
                }
                if(!best||bestScore<.01)break;
                seeds.push(best);
            }
            let centers=seeds.map(p=>p.lab.slice());
            for(let pass=0;pass<10;pass++){
                const accum=centers.map(()=>[0,0,0,0]);
                for(const p of points){
                    let idx=0,dist=Infinity;
                    for(let j=0;j<centers.length;j++){const d=paletteDistance(p.lab,centers[j]);if(d<dist){dist=d;idx=j;}}
                    const a=accum[idx];a[0]+=p.lab[0]*p.weight;a[1]+=p.lab[1]*p.weight;a[2]+=p.lab[2]*p.weight;a[3]+=p.weight;
                }
                centers=centers.map((c,i)=>accum[i][3]?accum[i].slice(0,3).map(v=>v/accum[i][3]):c);
            }
            const groups=centers.map(()=>({weight:0,rgb:[0,0,0],lab:[0,0,0]}));
            for(const p of points){
                let idx=0,dist=Infinity;
                for(let j=0;j<centers.length;j++){const d=paletteDistance(p.lab,centers[j]);if(d<dist){dist=d;idx=j;}}
                const g=groups[idx];g.weight+=p.count;
                for(let k=0;k<3;k++){g.rgb[k]+=p.rgb[k]*p.count;g.lab[k]+=p.lab[k]*p.count;}
            }
            let result=groups.filter(g=>g.weight).map(g=>({rgb:g.rgb.map(x=>x/g.weight),lab:g.lab.map(x=>x/g.weight),weight:g.weight}));
            result.sort((a,b)=>b.weight-a.weight);
            if(merge){
                const merged=[];
                for(const c of result){
                    const found=merged.find(m=>paletteDistance(c.lab,m.lab)<150);
                    if(found){
                        const total=found.weight+c.weight;
                        found.rgb=found.rgb.map((v,i)=>(v*found.weight+c.rgb[i]*c.weight)/total);
                        found.weight=total;found.lab=paletteRGBToLab(...found.rgb);
                    }else merged.push({...c,rgb:c.rgb.slice()});
                }
                result=merged;
            }
            if(mode==='balanced'){
                result.sort((a,b)=>b.weight-a.weight);
                const head=result.slice(0,Math.ceil(result.length/2));
                const tail=result.slice(Math.ceil(result.length/2)).sort((a,b)=>Math.hypot(b.lab[1],b.lab[2])-Math.hypot(a.lab[1],a.lab[2]));
                result=head.concat(tail);
            }
            paletteCurrent=result.map(c=>paletteHex(c.rgb));
            paletteRender();
        }
        function paletteRender(){
            const box=document.getElementById('palette-colors');box.replaceChildren();
            paletteCurrent.forEach((hex,i)=>{
                const item=document.createElement('button');item.type='button';item.className='palette-swatch';
                item.title='Copy '+hex;item.setAttribute('aria-label','Copy color '+hex);
                const sw=document.createElement('span');sw.className='palette-swatch-color';sw.style.backgroundColor=hex;
                const code=document.createElement('strong');code.textContent=hex;
                const hint=document.createElement('small');hint.textContent='Copy';
                item.append(sw,code,hint);
                item.addEventListener('click',()=>paletteCopy(hex,'Copied '+hex));
                box.appendChild(item);
            });
            document.getElementById('palette-count-label').textContent='· '+paletteCurrent.length+' colors';
            document.getElementById('palette-actions').style.display=paletteCurrent.length?'flex':'none';
        }
        async function paletteCopy(value,success){
            try{await navigator.clipboard.writeText(value);paletteStatus(success);}
            catch(e){paletteStatus('Clipboard unavailable. Try using the exported file instead.');}
        }
        function paletteCopyAll(){if(paletteCurrent.length)paletteCopy(paletteCurrent.join(', '),'HEX codes copied.');}
        function paletteExport(format){
            if(!paletteCurrent.length)return;
            let data,type,name;
            if(format==='css'){
                data=':root {\n'+paletteCurrent.map((c,i)=>'  --palette-'+(i+1)+': '+c+';').join('\n')+'\n}\n';
                type='text/css';name='palette.css';
            }else if(format==='json'){
                data=JSON.stringify({colors:paletteCurrent},null,2);type='application/json';name='palette.json';
            }else{
                const width=600,h=140;
                data='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+h+'" viewBox="0 0 '+width+' '+h+'">'+paletteCurrent.map((c,i)=>{
                    const x=i*width/paletteCurrent.length,w=width/paletteCurrent.length;
                    return '<rect x="'+x+'" width="'+w+'" height="110" fill="'+c+'"/><text x="'+(x+w/2)+'" y="130" font-family="Arial" font-size="13" text-anchor="middle" fill="#222">'+c+'</text>';
                }).join('')+'</svg>';
                type='image/svg+xml';name='palette.svg';
            }
            const url=URL.createObjectURL(new Blob([data],{type}));
            const link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();
            setTimeout(()=>URL.revokeObjectURL(url),1500);
        }
        function paletteReset(){
            if(paletteImageURL)URL.revokeObjectURL(paletteImageURL);
            paletteImageURL=null;paletteImageCanvas=null;palettePixels=null;paletteCurrent=[];
            document.getElementById('palette-file').value='';
            document.getElementById('palette-image-wrap').style.display='none';
            document.getElementById('palette-image').removeAttribute('src');
            document.getElementById('palette-count').value='5';
            document.getElementById('palette-method').value='dominant';
            document.getElementById('palette-merge').checked=true;
            document.getElementById('palette-colors').textContent='Add an image to extract its colors.';
            document.getElementById('palette-count-label').textContent='';
            document.getElementById('palette-actions').style.display='none';
            document.getElementById('palette-sampled').textContent='';
            paletteStatus('Your image stays in your browser.');
        }
        (function paletteInit(){
            const drop=document.getElementById('palette-drop');
            if(!drop)return;
            ['dragenter','dragover'].forEach(type=>drop.addEventListener(type,e=>{e.preventDefault();e.stopPropagation();drop.classList.add('palette-dragging');}));
            ['dragleave','drop'].forEach(type=>drop.addEventListener(type,e=>{e.preventDefault();e.stopPropagation();drop.classList.remove('palette-dragging');}));
            drop.addEventListener('drop',e=>{if(e.dataTransfer.files.length)paletteReadFile(e.dataTransfer.files[0]);});
            document.getElementById('palette-image').addEventListener('click',e=>{
                if(!paletteImageCanvas)return;
                const rect=e.currentTarget.getBoundingClientRect();
                const x=Math.min(paletteImageCanvas.width-1,Math.max(0,Math.floor((e.clientX-rect.left)/rect.width*paletteImageCanvas.width)));
                const y=Math.min(paletteImageCanvas.height-1,Math.max(0,Math.floor((e.clientY-rect.top)/rect.height*paletteImageCanvas.height)));
                const data=paletteImageCanvas.getContext('2d').getImageData(x,y,1,1).data;
                const hex=paletteHex([data[0],data[1],data[2]]);
                document.getElementById('palette-sampled').textContent='Sampled '+hex+' · click to copy';
                const label=document.getElementById('palette-sampled');
                label.style.cursor='pointer';label.onclick=()=>paletteCopy(hex,'Copied sampled color '+hex);
            });
        })();

        // Editable illustrative rates (USD per million tokens). Never treated as live prices.
        const aiRateExamples = {
            gpt4o: {input:2.5,output:10,cached:1.25},
            gpt4omini: {input:.15,output:.60,cached:.075},
            claude35: {input:3,output:15,cached:.30},
            gemini25: {input:.30,output:2.50,cached:.075}
        };
        let aiLastReport='';
        function aiSafeNum(id,max=1e9){
            const el=document.getElementById(id);const n=Number(el.value);
            return Number.isFinite(n)?Math.max(0,Math.min(max,n)):0;
        }
        function aiMoney(n){
            if(n===0)return '$0.00';
            if(n<.01)return '$'+n.toFixed(6);
            return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4});
        }
        function aiSetModel(){
            const key=document.getElementById('ai-model').value;
            if(aiRateExamples[key]){
                const r=aiRateExamples[key];
                document.getElementById('ai-input-rate').value=r.input;
                document.getElementById('ai-output-rate').value=r.output;
                document.getElementById('ai-cached-rate').value=r.cached;
            }else document.getElementById('ai-cost-advanced').open=true;
            calcTokens();
        }
        function aiCustomRatesChanged(){document.getElementById('ai-model').value='custom';calcTokens();}
        function aiManualInputChanged(){document.getElementById('ai-token-method').value='manual';calcTokens();}
        function aiEstimatedInput(text,method){
            if(!text.trim())return 0;
            if(method==='words')return Math.ceil((text.match(/\S+/g)||[]).length*1.33);
            // Approximation for ordinary English; actual provider tokenizer may differ substantially.
            return Math.ceil([...text].length/4);
        }
        function calcTokens(){
            const text=document.getElementById('token-input').value;
            const method=document.getElementById('ai-token-method').value;
            const inputEl=document.getElementById('ai-input-tokens');
            const words=(text.match(/\S+/g)||[]).length;
            document.getElementById('ai-text-info').textContent=[...text].length.toLocaleString()+' characters · '+words.toLocaleString()+' words';
            if(method!=='manual')inputEl.value=aiEstimatedInput(text,method);
            const input=aiSafeNum('ai-input-tokens');
            const output=aiSafeNum('ai-output-tokens');
            const requests=Math.max(1,Math.floor(aiSafeNum('ai-requests')));
            const cachedFraction=aiSafeNum('ai-cached-percent',100)/100;
            const overhead=aiSafeNum('ai-overhead');
            const rateIn=aiSafeNum('ai-input-rate',1e6),rateOut=aiSafeNum('ai-output-rate',1e6),rateCached=aiSafeNum('ai-cached-rate',1e6);
            const inputTotal=input+overhead;
            const cachedTokens=inputTotal*cachedFraction;
            const uncachedTokens=inputTotal-cachedTokens;
            const inputCost=(uncachedTokens*rateIn+cachedTokens*rateCached)/1e6*requests;
            const outputCost=output*rateOut/1e6*requests;
            const total=inputCost+outputCost;
            const fmt=n=>Math.round(n).toLocaleString('en-US');
            document.getElementById('res-tokens').textContent=fmt(inputTotal);
            document.getElementById('ai-out-summary').textContent=fmt(output);
            document.getElementById('res-cost').textContent=aiMoney(total);
            document.getElementById('ai-per-request').textContent=aiMoney(total/requests);
            document.getElementById('ai-input-spend').textContent=aiMoney(inputCost);
            document.getElementById('ai-output-spend').textContent=aiMoney(outputCost);
            document.getElementById('ai-total-tokens').textContent=fmt((inputTotal+output)*requests);
            document.getElementById('ai-bar-input').style.width=(total?inputCost/total*100:50)+'%';
            document.getElementById('ai-bar-output').style.width=(total?outputCost/total*100:50)+'%';
            const label=document.getElementById('ai-model').selectedOptions[0].textContent;
            document.getElementById('ai-estimate-note').textContent='Using '+label+'. Rates are editable examples, not live quotes. Token counts are approximate unless manually supplied.';
            aiLastReport=['AI API Cost Estimate','Pricing: '+label,'Input tokens/request: '+inputTotal,'Output tokens/request: '+output,'Requests: '+requests,'Cached input: '+(cachedFraction*100)+'%','Input rate / 1M: $'+rateIn,'Cached input rate / 1M: $'+rateCached,'Output rate / 1M: $'+rateOut,'Input spend: '+aiMoney(inputCost),'Output spend: '+aiMoney(outputCost),'Cost/request: '+aiMoney(total/requests),'Total spend: '+aiMoney(total),'Disclaimer: Estimated, not live provider pricing.'].join('\n');
        }
        function aiLoadExample(){
            document.getElementById('token-input').value='You are a helpful customer support assistant. Summarize the following customer request in two sentences and suggest a clear, professional response. The customer reports that their order arrived late and one item was missing.';
            document.getElementById('ai-output-tokens').value=350;
            document.getElementById('ai-requests').value=10000;
            document.getElementById('ai-cached-percent').value=20;
            document.getElementById('ai-token-method').value='chars';
            calcTokens();
        }
        function aiReset(){
            document.getElementById('token-input').value='';
            document.getElementById('ai-token-method').value='chars';
            document.getElementById('ai-output-tokens').value=500;
            document.getElementById('ai-requests').value=1000;
            document.getElementById('ai-cached-percent').value=0;
            document.getElementById('ai-overhead').value=0;
            document.getElementById('ai-model').value='gpt4o';
            aiSetModel();
        }
        async function aiCopyReport(){
            calcTokens();
            try{await navigator.clipboard.writeText(aiLastReport);const el=document.getElementById('ai-estimate-note');el.textContent='Report copied. Remember to verify current provider pricing.';}
            catch(e){alert('Clipboard unavailable in this browser.');}
        }
        function aiDownloadCSV(){
            calcTokens();
            const rows=aiLastReport.split('\n').map(line=>{
                const idx=line.indexOf(': ');
                return idx<0?[line,'']:[line.slice(0,idx),line.slice(idx+2)];
            });
            const csv=rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
            const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
            const a=document.createElement('a');a.href=url;a.download='ai-api-cost-estimate.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
        }
        document.addEventListener('DOMContentLoaded',()=>{if(document.getElementById('ai-model'))calcTokens();});

        // Functions for Restored Tools
        let engReport = null;
        function engUpdateBasis(){
            const basis=document.getElementById('eng-basis').value;
            const label={followers:'Followers',reach:'Reach (unique accounts)',impressions:'Impressions (total views)'}[basis];
            document.getElementById('eng-audience-label').textContent=label;
            document.getElementById('eng-rate-label').textContent='Engagement rate by '+basis;
            calcEngagement();
        }
        function engNum(id){
            const raw=document.getElementById(id).value.trim();
            if(raw==='')return 0;
            const value=Number(raw);
            return Number.isFinite(value)&&value>=0&&Number.isInteger(value)?value:null;
        }
        function calcEngagement(){
            const basis=document.getElementById('eng-basis').value;
            const audience=engNum('eng-followers'),posts=engNum('eng-posts');
            const counts=[engNum('eng-likes'),engNum('eng-comments'),engNum('eng-shares'),engNum('eng-saves')];
            const output=id=>document.getElementById(id);
            const valid=audience!==null&&posts!==null&&counts.every(x=>x!==null)&&posts>0;
            if(!valid||audience<=0){
                ['eng-result','eng-total','eng-average','eng-post-rate','eng-basis-value'].forEach(id=>output(id).textContent='—');
                output('eng-breakdown').replaceChildren();output('eng-legend').replaceChildren();
                output('eng-status').textContent=!valid?'Use non-negative whole numbers, and at least one post.':'Enter a '+basis+' value greater than zero.';
                engReport=null;return;
            }
            const labels=['Likes / reactions','Comments','Shares / reposts','Saves / bookmarks'];
            const included=counts.map((n,i)=>i===2&&output('eng-exclude-shares').checked?0:i===3&&output('eng-exclude-saves').checked?0:n);
            const total=included.reduce((a,b)=>a+b,0);
            const rate=total/audience*100;
            const perPost=total/posts;
            const postRate=basis==='followers'?rate/posts:null;
            const format=n=>n.toLocaleString('en-US',{maximumFractionDigits:2});
            const pct=n=>n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
            output('eng-result').textContent=pct(rate);
            output('eng-total').textContent=format(total);
            output('eng-average').textContent=format(perPost);
            output('eng-post-rate').textContent=postRate===null?'Not applicable':pct(postRate);
            output('eng-basis-value').textContent=format(audience);
            output('eng-status').textContent=total===0?'No engagement actions entered yet.':basis==='followers'&&posts>1?'Total engagements divided by followers; see average rate per post below.':'Calculated from the engagement actions you included.';
            const colors=['#3b82f6','#14b8a6','#f59e0b','#a855f7'];
            const bar=output('eng-breakdown'),legend=output('eng-legend');bar.replaceChildren();legend.replaceChildren();
            included.forEach((n,i)=>{
                if(n>0){const segment=document.createElement('span');segment.style.width=(n/total*100)+'%';segment.style.background=colors[i];segment.title=labels[i]+': '+format(n);bar.appendChild(segment);}
                const item=document.createElement('span');item.style.display='inline-flex';item.style.alignItems='center';item.style.gap='5px';
                const dot=document.createElement('span');dot.style.cssText='display:inline-block;width:9px;height:9px;border-radius:3px;background:'+colors[i];
                item.append(dot,document.createTextNode(labels[i]+': '+format(n)));legend.appendChild(item);
            });
            engReport={platform:output('eng-platform').value,basis,audience,posts,likes:included[0],comments:included[1],shares:included[2],saves:included[3],total,perPost,rate,postRate};
        }
        function engSample(){
            document.getElementById('eng-platform').value='Instagram';
            document.getElementById('eng-basis').value='followers';
            [['eng-followers',10000],['eng-posts',3],['eng-likes',1250],['eng-comments',88],['eng-shares',70],['eng-saves',110]].forEach(([id,n])=>document.getElementById(id).value=n);
            document.getElementById('eng-exclude-saves').checked=false;
            document.getElementById('eng-exclude-shares').checked=false;engUpdateBasis();
        }
        function engReset(){
            ['eng-followers','eng-likes','eng-comments','eng-shares','eng-saves'].forEach(id=>document.getElementById(id).value='');
            document.getElementById('eng-posts').value=1;document.getElementById('eng-basis').value='followers';
            document.getElementById('eng-platform').value='Instagram';
            document.getElementById('eng-exclude-saves').checked=false;document.getElementById('eng-exclude-shares').checked=false;engUpdateBasis();
        }
        function engReportLines(){
            if(!engReport)return null;
            const r=engReport,fmt=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:2});
            return ['Social Engagement Report','Platform: '+r.platform,'Basis: '+r.basis,'Audience: '+fmt(r.audience),'Posts: '+fmt(r.posts),'Likes: '+fmt(r.likes),'Comments: '+fmt(r.comments),'Shares: '+fmt(r.shares),'Saves: '+fmt(r.saves),'Total engagements: '+fmt(r.total),'Average engagements per post: '+fmt(r.perPost),'Engagement rate: '+r.rate.toFixed(2)+'%','Average follower-based rate per post: '+(r.postRate===null?'Not applicable':r.postRate.toFixed(2)+'%'),'Method: included engagement actions divided by selected audience denominator.'];
        }
        async function engCopyReport(){
            const lines=engReportLines();if(!lines){alert('Enter valid data first.');return;}
            try{await navigator.clipboard.writeText(lines.join('\n'));document.getElementById('eng-status').textContent='Report copied.';}
            catch(e){document.getElementById('eng-status').textContent='Clipboard unavailable; try CSV download.';}
        }
        function engDownloadCSV(){
            const lines=engReportLines();if(!lines){alert('Enter valid data first.');return;}
            const rows=lines.map(line=>{const pos=line.indexOf(': ');return pos<0?[line,'']:[line.slice(0,pos),line.slice(pos+2)];});
            const csv=rows.map(row=>row.map(cell=>'"'+String(cell).replace(/"/g,'""')+'"').join(',')).join('\r\n');
            const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
            const link=document.createElement('a');link.href=url;link.download='engagement-report.csv';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
        }

        let metaAuditData=null;
        function metaText(el,text){document.getElementById(el).textContent=text||'';}
        function metaStatus(text){metaText('meta-status',text);}
        function metaValue(doc,selector){const el=doc.querySelector(selector);return el?(el.getAttribute('content')||'').trim():'';}
        function metaAbsolute(value,base){if(!value)return '';try{return new URL(value,base||'https://example.com/').href;}catch(e){return value;}}
        function metaGet(doc){
            const url=document.getElementById('meta-url').value.trim();
            const title=(doc.querySelector('title')?.textContent||'').trim();
            const description=metaValue(doc,'meta[name="description" i]');
            const canonical=doc.querySelector('link[rel~="canonical" i]')?.getAttribute('href')?.trim()||'';
            const robots=metaValue(doc,'meta[name="robots" i]');
            const viewport=metaValue(doc,'meta[name="viewport" i]');
            const charset=doc.querySelector('meta[charset]')?.getAttribute('charset')||metaValue(doc,'meta[http-equiv="content-type" i]');
            const ogTitle=metaValue(doc,'meta[property="og:title" i]');
            const ogDescription=metaValue(doc,'meta[property="og:description" i]');
            const ogImage=metaValue(doc,'meta[property="og:image" i]');
            const ogUrl=metaValue(doc,'meta[property="og:url" i]');
            const ogType=metaValue(doc,'meta[property="og:type" i]');
            const twitterCard=metaValue(doc,'meta[name="twitter:card" i]');
            const twitterTitle=metaValue(doc,'meta[name="twitter:title" i]');
            const twitterDescription=metaValue(doc,'meta[name="twitter:description" i]');
            const twitterImage=metaValue(doc,'meta[name="twitter:image" i]');
            const lang=doc.documentElement?.getAttribute('lang')||'';
            const tags=[];
            doc.querySelectorAll('meta').forEach(el=>{const key=el.getAttribute('name')||el.getAttribute('property')||el.getAttribute('http-equiv')||(el.hasAttribute('charset')?'charset':'meta');const value=el.getAttribute('content')||el.getAttribute('charset')||'';tags.push({name:key,value});});
            doc.querySelectorAll('link[rel~="canonical" i],link[rel~="alternate" i]').forEach(el=>tags.push({name:'link: '+el.getAttribute('rel'),value:el.getAttribute('href')||''}));
            const checks=[];
            function check(name,pass,warning,detail){checks.push({name,status:pass?'pass':warning?'warning':'fail',detail});}
            check('Page title',!!title,false,title?`${title.length} characters · ${title.length>65?'May truncate in search results':title.length<25?'Consider a more descriptive title':'Good length'} `:'Missing <title> tag');
            check('Meta description',!!description,false,description?`${description.length} characters · ${description.length>160?'May truncate in search results':description.length<70?'Consider adding detail':'Review against search intent'}`:'Missing meta description');
            check('Canonical URL',!!canonical,true,canonical?metaAbsolute(canonical,url):'Recommended to help consolidate duplicate URLs');
            check('Mobile viewport',!!viewport,false,viewport||'Missing viewport meta tag');
            check('Indexing directive',!/(^|[,\s])noindex\b/i.test(robots),false,robots||'No robots directive found (indexing usually permitted by default)');
            check('Open Graph title',!!ogTitle,true,ogTitle||'Missing og:title');
            check('Open Graph description',!!ogDescription,true,ogDescription||'Missing og:description');
            check('Open Graph image',!!ogImage,true,ogImage||'Missing og:image');
            check('Open Graph URL',!!ogUrl,true,ogUrl||'Missing og:url');
            check('X / Twitter card',!!twitterCard,true,twitterCard||'Missing twitter:card');
            check('HTML language',!!lang,true,lang||'No lang attribute detected (paste full HTML to check)');
            check('Character encoding',!!charset,true,charset||'No charset declaration detected');
            const duplicates=[];
            const names=new Map();
            tags.forEach(tag=>{const k=tag.name.toLowerCase();if(k==='meta')return;names.set(k,(names.get(k)||0)+1);});
            names.forEach((n,k)=>{if(n>1&&['description','robots','og:title','og:description','og:image','og:url','twitter:card'].includes(k))duplicates.push(k);});
            check('Conflicting duplicate tags',!duplicates.length,false,duplicates.length?'Repeated: '+duplicates.join(', '):'No duplicate priority tags detected');
            const passed=checks.filter(c=>c.status==='pass').length;
            return {url,title,description,canonical,robots,viewport,charset,ogTitle,ogDescription,ogImage,ogUrl,ogType,twitterCard,twitterTitle,twitterDescription,twitterImage,lang,tags,checks,passed,score:Math.round(passed/checks.length*100)};
        }
        function inspectMetaTags(){
            const html=document.getElementById('meta-input').value.trim();
            if(!html){metaStatus('Paste HTML source first, or try fetching a URL.');return;}
            const doc=new DOMParser().parseFromString(html,'text/html');
            metaAuditData=metaGet(doc);
            const d=metaAuditData;
            document.getElementById('meta-empty').style.display='none';
            document.getElementById('meta-results').style.display='block';
            metaText('meta-score',d.score+'%');metaText('meta-score-label',d.score>=85?'Strong foundation':d.score>=60?'Needs improvement':'Needs attention');
            metaText('meta-passed',d.passed+'/'+d.checks.length);metaText('meta-check-count','Checks passed');
            const checks=document.getElementById('meta-checks');checks.replaceChildren();
            d.checks.forEach(c=>{const row=document.createElement('div');row.className='meta-check '+c.status;const dot=document.createElement('span');dot.className='meta-check-dot';dot.textContent=c.status==='pass'?'✓':c.status==='warning'?'!':'×';const body=document.createElement('div');const name=document.createElement('strong');name.textContent=c.name;const detail=document.createElement('small');detail.textContent=c.detail;body.append(name,detail);row.append(dot,body);checks.append(row);});
            let domain='example.com';try{if(d.url)domain=new URL(d.url).hostname;}catch(e){}
            metaText('meta-serp-url',d.url||'https://example.com/page');
            metaText('meta-serp-title',d.title||'Page title missing');
            metaText('meta-serp-desc',d.description||'No meta description found. Search engines may generate a snippet from page content.');
            metaText('meta-social-domain',domain.toUpperCase());
            metaText('meta-social-title',d.ogTitle||d.title||'Untitled page');
            metaText('meta-social-desc',d.ogDescription||d.description||'No social description found.');
            const image=document.getElementById('meta-social-image');image.replaceChildren();
            if(d.ogImage){const img=document.createElement('img');img.alt='Open Graph image preview';img.loading='lazy';img.referrerPolicy='no-referrer';img.src=metaAbsolute(d.ogImage,d.url);img.onerror=()=>{image.textContent='Image unavailable or blocked';};image.append(img);}else image.textContent='No Open Graph image';
            const tags=document.getElementById('meta-tags');tags.replaceChildren();
            const entries=[{name:'title',value:d.title},...d.tags];
            if(!entries.length)tags.textContent='No metadata detected.';
            entries.forEach(t=>{const row=document.createElement('div');row.className='meta-tag-row';const name=document.createElement('strong');name.textContent=t.name;const value=document.createElement('span');value.textContent=t.value||'(empty)';row.append(name,value);tags.append(row);});
            metaStatus(`Analysis complete: ${d.passed} of ${d.checks.length} checks passed. Search and social previews are illustrative, not guaranteed renderings.`);
        }
        async function metaFetchURL(){
            const value=document.getElementById('meta-url').value.trim();let url;
            try{url=new URL(value);if(!['http:','https:'].includes(url.protocol))throw Error();}catch(e){metaStatus('Enter a valid http:// or https:// URL.');return;}
            metaStatus('Trying to fetch the page directly from your browser…');
            try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);let response;try{response=await fetch(url.href,{signal:controller.signal,redirect:'follow'});}finally{clearTimeout(timer);}
                if(!response.ok)throw Error('HTTP '+response.status);
                const html=await response.text();if(html.length>2500000)throw Error('HTML exceeds the 2.5 MB limit');
                document.getElementById('meta-input').value=html;inspectMetaTags();
            }catch(e){metaStatus('Could not fetch this URL ('+e.message+'). Many sites block browser cross-origin requests. Paste the page HTML source instead. No proxy is used.');}
        }
        function metaLoadExample(){document.getElementById('meta-url').value='https://example.com/blog';document.getElementById('meta-input').value='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>How to Build Better Websites | Example</title><meta name="description" content="Learn practical design and SEO tips to build accessible, fast websites that look professional on desktop and mobile devices."><link rel="canonical" href="https://example.com/blog"><meta property="og:title" content="How to Build Better Websites"><meta property="og:description" content="A practical guide to great websites."><meta property="og:url" content="https://example.com/blog"><meta property="og:image" content="https://example.com/cover.jpg"><meta name="twitter:card" content="summary_large_image"></head><body></body></html>';inspectMetaTags();}
        function metaReset(){document.getElementById('meta-url').value='';document.getElementById('meta-input').value='';metaAuditData=null;document.getElementById('meta-results').style.display='none';document.getElementById('meta-empty').style.display='flex';metaStatus('Analysis happens in your browser. Paste HTML to get started.');}
        function metaReportText(){if(!metaAuditData)return '';const d=metaAuditData;return 'Meta Tag Audit\nURL: '+(d.url||'Not specified')+'\nScore: '+d.score+'% ('+d.passed+'/'+d.checks.length+')\n\nChecks:\n'+d.checks.map(c=>c.status.toUpperCase()+' | '+c.name+' | '+c.detail).join('\n')+'\n\nTags:\n'+[{name:'title',value:d.title},...d.tags].map(t=>t.name+': '+t.value).join('\n');}
        async function metaCopyReport(){if(!metaAuditData)return;try{await navigator.clipboard.writeText(metaReportText());metaStatus('Audit report copied.');}catch(e){metaStatus('Clipboard unavailable. Use the export buttons instead.');}}
        function metaExport(format){if(!metaAuditData)return;const d=metaAuditData;let body,type,filename;if(format==='json'){body=JSON.stringify(d,null,2);type='application/json';filename='meta-audit.json';}else{const escape=x=>'"'+String(x??'').replace(/"/g,'""')+'"';const rows=[['Type','Name','Status','Value'],...d.checks.map(c=>['Check',c.name,c.status,c.detail]),...d.tags.map(t=>['Tag',t.name,'',t.value])];body=rows.map(r=>r.map(escape).join(',')).join('\r\n');type='text/csv';filename='meta-audit.csv';}const url=URL.createObjectURL(new Blob([body],{type:type+';charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}

        let htmlminResult='';
        function htmlminBytes(s){return new TextEncoder().encode(s).length;}
        function htmlminFormatBytes(n){return n>=1048576?(n/1048576).toFixed(2)+' MB':n>=1024?(n/1024).toFixed(2)+' KB':n+' B';}
        function htmlminStatus(s){document.getElementById('htmlmin-status').textContent=s;}
        function htmlminUpload(input){
            const file=input.files&&input.files[0];if(!file)return;
            if(!/\.html?$/i.test(file.name)&&file.type!=='text/html'){htmlminStatus('Please choose an .html or .htm file.');return;}
            if(file.size>5*1024*1024){htmlminStatus('Choose an HTML file smaller than 5 MB.');return;}
            const reader=new FileReader();reader.onload=()=>{document.getElementById('html-input').value=String(reader.result);htmlminStatus('Loaded '+file.name+'. Ready to compress.');};
            reader.onerror=()=>htmlminStatus('Could not read this file.');reader.readAsText(file);input.value='';
        }
        function htmlminExample(){
            document.getElementById('html-input').value='<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <!-- Page description -->\n    <title>  Example Page  </title>\n  </head>\n  <body>\n    <main>\n      <h1>Hello world!</h1>\n      <p>Extra     spaces can be reduced safely.</p>\n      <pre>Keep    this    spacing.</pre>\n    </main>\n  </body>\n</html>';
            htmlminStatus('Example loaded. Click Compress HTML.');
        }
        function htmlminReset(){
            document.getElementById('html-input').value='';document.getElementById('html-output').value='';htmlminResult='';
            ['htmlmin-original','htmlmin-compressed','htmlmin-saved'].forEach(id=>document.getElementById(id).textContent='—');
            document.getElementById('htmlmin-meter-fill').style.width='0%';htmlminStatus('Processing stays in your browser.');
        }
        function htmlminTransform(html,opts){
            // Tokenize tags/comments while preserving raw-text elements and quoted attributes.
            const chunks=[];let i=0,raw=null,preserveDepth=0;
            const protectedTags=new Set(['pre','textarea','script','style','code','svg','math']);
            const blocks=new Set(['html','head','body','main','section','article','aside','nav','header','footer','div','p','ul','ol','li','table','thead','tbody','tfoot','tr','td','th','h1','h2','h3','h4','h5','h6','form','fieldset','figure','figcaption','blockquote','details','summary','dl','dt','dd']);
            while(i<html.length){
                if(raw){
                    const rx=new RegExp('</\\s*'+raw+'\\s*>','ig');rx.lastIndex=i;
                    const match=rx.exec(html);
                    if(!match){chunks.push({type:'text',value:html.slice(i),protected:true});break;}
                    chunks.push({type:'text',value:html.slice(i,match.index),protected:true});i=match.index;raw=null;continue;
                }
                if(html.startsWith('<!--',i)){
                    const end=html.indexOf('-->',i+4),next=end<0?html.length:end+3;
                    const comment=html.slice(i,next);
                    if(!opts.comments||/^(<!--\s*(?:\[if|<!\[endif|#|!))/i.test(comment)||end<0)chunks.push({type:'comment',value:comment});
                    i=next;continue;
                }
                if(html[i]==='<'){
                    let j=i+1,quote=null;
                    while(j<html.length){const c=html[j];if(quote){if(c===quote)quote=null;}else if(c==='"'||c==="'")quote=c;else if(c==='>'){j++;break;}j++;}
                    if(j<=html.length&&html[j-1]==='>'){
                        const tag=html.slice(i,j),match=/^<\s*(\/?)\s*([a-z][\w:-]*)\b/i.exec(tag);
                        if(match){
                            const closing=!!match[1],name=match[2].toLowerCase();
                            if(closing&&protectedTags.has(name))preserveDepth=Math.max(0,preserveDepth-1);
                            chunks.push({type:'tag',value:tag,name,closing,block:blocks.has(name),protected:preserveDepth>0});
                            if(!closing&&protectedTags.has(name)&&!(/\/\s*>$/.test(tag))){preserveDepth++;if(name==='script'||name==='style'||name==='textarea')raw=name;}
                        }else chunks.push({type:'tag',value:tag,name:'',block:false});
                        i=j;continue;
                    }
                }
                let j=html.indexOf('<',i+1);if(j<0)j=html.length;
                let value=html.slice(i,j);
                if(opts.whitespace&&preserveDepth===0)value=value.replace(/\s+/g,' ');
                chunks.push({type:'text',value,protected:preserveDepth>0});i=j;
            }
            if(opts.between){
                for(let k=1;k<chunks.length-1;k++){
                    const cur=chunks[k],prev=chunks[k-1],next=chunks[k+1];
                    if(cur.type==='text'&&!cur.protected&&/^\s+$/.test(cur.value)&&prev.type==='tag'&&next.type==='tag'&&prev.block&&next.block)cur.value='';
                }
            }
            return chunks.map(c=>c.value).join('');
        }
        function minifyHTML(){
            const source=document.getElementById('html-input').value;
            if(!source.trim()){htmlminStatus('Paste or upload HTML to compress.');return;}
            const opts={comments:document.getElementById('htmlmin-comments').checked,whitespace:document.getElementById('htmlmin-whitespace').checked,between:document.getElementById('htmlmin-between').checked};
            try{
                htmlminResult=htmlminTransform(source,opts);
                const original=htmlminBytes(source),compressed=htmlminBytes(htmlminResult),saved=original-compressed,pct=original?100*saved/original:0;
                document.getElementById('html-output').value=htmlminResult;
                document.getElementById('htmlmin-original').textContent=htmlminFormatBytes(original);
                document.getElementById('htmlmin-compressed').textContent=htmlminFormatBytes(compressed);
                document.getElementById('htmlmin-saved').textContent=htmlminFormatBytes(Math.max(0,saved))+' ('+Math.max(0,pct).toFixed(1)+'%)';
                document.getElementById('htmlmin-meter-fill').style.width=Math.max(0,Math.min(100,pct))+'%';
                htmlminStatus(saved>=0?'Compressed successfully. Review output before production use.':'Output increased slightly; review your options.');
            }catch(e){htmlminStatus('Could not compress HTML: '+e.message);}
        }
        async function htmlminCopy(){
            if(!htmlminResult){htmlminStatus('Compress HTML first.');return;}
            try{await navigator.clipboard.writeText(htmlminResult);htmlminStatus('Compressed HTML copied.');}
            catch(e){document.getElementById('html-output').focus();document.getElementById('html-output').select();htmlminStatus('Clipboard unavailable. Output selected for manual copying.');}
        }
        function htmlminDownload(){
            if(!htmlminResult){htmlminStatus('Compress HTML first.');return;}
            const url=URL.createObjectURL(new Blob([htmlminResult],{type:'text/html;charset=utf-8'}));
            const a=document.createElement('a');a.href=url;a.download='compressed.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
            htmlminStatus('Compressed HTML downloaded.');
        }
    