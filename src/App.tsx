import React, { useEffect, useState } from 'react';
import './App.css';
import ContentRenderer from './ContentRenderer';
import partsOfContent, { PartOfContent } from './partsOfContent';

function App() {
  const [partsOfContents, setpartsOfContents] = useState<PartOfContent[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await partsOfContent(
        "```\r\nТемы:\r\n\r\n-  CI/CD для документации.\\\r\n   <https://www.youtube.com/watch?v=ftnVllssoI8>\r\n\r\n-  Gramax: git для нетехнических сотрудников.\\\r\n   Тут чисто про продукт и как в нём использовать git-практики.\r\n\r\n-  Как сделать так, чтобы документы не умирали?\\\r\n   Осноaной упор на лёгкое внесение праqок, ревью, просмотр изменений и бренчевание.\r\n\r\n-  Gitlab + VSCode + ?? = Docs as code\\\r\n   Рассказать о том, как на коленке соsать себе docs as code, а в конце выступления сказать: но если хотите более простое и бесплатное решение, то мы готовы рассказать об этом вне сцены.\r\n\r\n   -  <https://www.youtube.com/watch?v=QqgaX8JFyB8&t=157s>\r\n\r\n   -  <https://vimeo.com/583642755>\r\n\r\nТемы2:\r\n\r\n-  Как работает Git и зачем он техническому писателю.\r\n\r\n   Git -- это система контроля версий, которую можно использовать при подготовке документации с подходом Docs as Code. Но что это такое? Зачем писать какие-то команды? Какая польза может быть для технического писателя?\\\r\n   Доклад будет полезен писeтелям, которые никогда не рабqтали с Git и хотят узнать, как его можно применить. А также командам, которые рассматривают возможность перехода на DaC\r\n\r\n-  Онбординг в Docs as Code за 2 дня -- реально?\\\r\n   Одна из главных проблем DaC -- продолжительный онбординг. Например, если технический писатель раньше не работал по подходу, полностью вкатить его в процесс получится только через пару месяцев. Мы решили эту проблему в своей компании, а затем -- опубликовали инструмент в опенсурс. В докладе расскажем, как в Gramax за 3 действия и без технических знаний опубликовать документацию.\r\n\r\n-  Круглый стол “Мqтрики документации”.\\\r\n   Всем людям свойственно привыкать к каким-то ограничениям. Но чем чаще мы обсуждаем проблемы профессии, тем больше людей вовлекается в процесс их решения. На круглом столе предлагаю вспомнить и обсудить проблемы инструментария технического писателя. Векторы для развития мысли:\r\n\r\n   -фывфывфывфыв\r\n```"
    );
      setpartsOfContents(result);   
    }
    fetchData();
  }, []);

  return (
    <div className="App">      
      <ContentRenderer data={partsOfContents}/>
    </div>
  );
}

export default App;
