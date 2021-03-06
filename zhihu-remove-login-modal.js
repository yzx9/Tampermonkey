// ==UserScript==
// @name         知乎屏蔽登录弹窗
// @namespace    https://github.com/yzx9/
// @version      0.3.4
// @description  屏蔽知乎问题界面的登录弹窗, 首部按钮登录依然可用
// @author       yuan.zx@outlook.com
// @match        https://*.zhihu.com/*
// @license      MIT
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
 
    // watch madal
    let disabled = false
 
    const body = document.body
    const html = document.documentElement
 
    const getModal = () => document.querySelector('.signFlowModal')
 
    const modalObserver = new MutationObserver(() => {
        const modal = getModal()
        if (!disabled && modal) {
            let parent = modal.parentNode
            while (parent.parentNode !== body) parent = parent.parentNode
            body.removeChild(parent)
            html.style.overflow = 'auto'
            html.style.marginRight = 'auto'
        }
    })
 
    modalObserver.observe(body, {
        childList: true,
        subtree: false
    })
 
    // watch login button
    const listener = () => {
        disabled = true
        setTimeout(() => {
            const close = document.querySelector('.Modal-closeButton')
            close.addEventListener('click', () => (disabled = false))
        }, 100)
    }
 
    const loginButtonObserver = new MutationObserver(() => {
        const buttons = Array.from(document.querySelectorAll('.AppHeader-login'))
        buttons.forEach(button => button.removeEventListener('click', listener))
        buttons.forEach(button => button.addEventListener('click', listener))
    })
 
    loginButtonObserver.observe(document.querySelector('.AppHeader'), {
        childList: true,
        subtree: true
    })
})();
