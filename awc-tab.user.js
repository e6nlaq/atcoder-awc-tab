// ==UserScript==
// @name         AtCoder AWC Tab
// @namespace    http://e6nlaq.vercel.app
// @version      1.0.0
// @description  AtCoderのナビゲーションバーに今日のAWCへのリンクを追加する
// @author       e6nlaq
// @match        https://atcoder.jp/*
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    // 平日数を計算する関数
    function getWorkdaysCount(startDate, endDate) {
        let count = 0;
        let curDate = new Date(startDate.getTime());

        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay(); // 0:日, 6:土
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    window.addEventListener('load', () => {
        // 基準日: 2026年2月9日
        const start = new Date(2026, 1, 9); // 月は0始まり(1=2月)
        const today = new Date();

        // 平日数xを計算
        const x = getWorkdaysCount(start, today);

        // 4桁に0埋め (例: 5 -> "0005")
        const xStr = String(x).padStart(4, '0');
        const targetUrl = `https://atcoder.jp/contests/awc${xStr}`;

        // 「AtCoder Daily Training」のリンクを探して挿入
        const adtLink = document.querySelector('a[href*="/contests/adt_top"]');
        if (adtLink) {
            const adtListItem = adtLink.closest('li');
            if (adtListItem) {
                const awcTabHtml = `
                    <li>
                        <a href="${targetUrl}">
                            <span>AtCoder Weekday Contest</span>
                        </a>
                    </li>
                `;
                adtListItem.insertAdjacentHTML('afterend', awcTabHtml);
            }
        }
    });
})();