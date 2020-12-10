const loadScript = (scriptUrl) => {
  return new Promise((res, rej) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    script.onload = () => {
      res();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};

export default loadScript;
