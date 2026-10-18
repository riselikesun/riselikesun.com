"use client";

import Script from "next/script";

const ChatbaseScript = ({chatbaseId}: {chatbaseId: string}) => {

  if (!chatbaseId) {
    return null;
  }

  return (
    <>
      <Script id="chatbase-config" strategy="lazyOnload">
        {`
          (function(){
            if(!window.chatbase||window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){
                  window.chatbase.q=[]
                }
                window.chatbase.q.push(arguments)
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){
                    return target.q
                  }
                  return(...args)=>target(prop,...args)
                }
              })
            }
          })();
        `}
      </Script>
      <Script
        src="https://www.chatbase.co/embed.min.js"
        id={chatbaseId}
        strategy="lazyOnload"
      />
    </>
  );
};

export default ChatbaseScript;
