// theme.js — toggle theme and client-side search
(function(){
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const search = document.getElementById('site-search');
const list = document.getElementById('post-list');


// initialize theme from localStorage or prefers-color-scheme fallback
function getSavedTheme(){
try{ return localStorage.getItem('theme'); }catch(e){ return null }
}
const saved = getSavedTheme();
if(saved) root.setAttribute('data-theme', saved);
else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme','dark');
else root.setAttribute('data-theme','light');


toggle && toggle.addEventListener('click', function(){
const cur = root.getAttribute('data-theme');
const nxt = cur === 'dark' ? 'light' : 'dark';
root.setAttribute('data-theme', nxt);
try{ localStorage.setItem('theme', nxt) }catch(e){}
});


// Simple client-side search that filters elements that have class .post-item
function normalize(s){return (s||'').toLowerCase()}
function filter(q){
if(!list) return;
const items = list.querySelectorAll('.post-item');
const term = normalize(q);
items.forEach(function(li){
const title = li.dataset.title || '';
const summary = li.dataset.summary || '';
const match = title.indexOf(term) !== -1 || summary.indexOf(term) !== -1;
li.style.display = match || term === '' ? '' : 'none';
});
}


if(search){
search.addEventListener('input', function(ev){ filter(ev.target.value) });
}
})();