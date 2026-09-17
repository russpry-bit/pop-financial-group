(function(){
  const params=new URLSearchParams(window.location.search);
  const fields={utm_source:'utm_source',utm_medium:'utm_medium',utm_campaign:'utm_campaign',utm_content:'utm_content',utm_term:'utm_term'};
  Object.entries(fields).forEach(([param,name])=>{
    const value=params.get(param)||sessionStorage.getItem('pop_'+param)||'';
    if(params.get(param)) sessionStorage.setItem('pop_'+param,params.get(param));
    document.querySelectorAll('[name="'+name+'"]').forEach(el=>el.value=value);
  });
  document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>{
    if(typeof gtag==='function') gtag('event',el.dataset.track,{event_category:'conversion',event_label:document.body.dataset.campaign||'campaign'});
  }));
  const form=document.querySelector('form[data-lead-form]');
  if(form) form.addEventListener('submit',()=>{
    if(typeof gtag==='function') gtag('event','generate_lead',{event_category:'conversion',event_label:document.body.dataset.campaign||'campaign'});
  });
})();
