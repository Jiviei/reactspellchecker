import Typo from "./typo";


interface typoRange {
    line: number;
    startIdx: number;
    endIdx: number;
}
interface SpellingMistake {
    range: typoRange;
    original: string;
    advices: string[];
}
const fetchData = async (path: string) => {    
      const response = await fetch(path);
      const data = await response.text();
      return data;
  };
const checkSpelling_typo = async (md: string) => {
    
    
    const dataaff = await fetchData('/dictionaries/ru_RU/ru_RU.aff');
    const datadic = await fetchData('/dictionaries/ru_RU/ru_RU.dic');

    var dictionary = new Typo(
        '*какая-то заглушка',
        dataaff,
        datadic
    );
    console.log(dictionary)

    var spellingMistakes: SpellingMistake[] = [];
    let lines: string[] = md.split("\n");
    for (var il = 0; il < lines.length; il++) {
        let words: string[] = lines[il].split(/[ .,/#!$%^&*;:{}=\-_`~()]/);
        let Idx = 0;
        for (var word of words) {
            if (word !== "") {
                if (!dictionary.check(word)) {
                    spellingMistakes.push({
                        range: {
                            line: il,
                            startIdx: Idx,
                            endIdx: Idx + word.length - 1
                        },
                        original: word,
                        advices: dictionary.suggest(word)
                    });
                }
            }
            Idx += word.length + 1;
        }
    }
    return spellingMistakes;
}

interface PartOfContent {
    content: string
    advices?: string[];
}
export type { PartOfContent };

const getPartsOfContent = (
    md: string,
    spellingMistakes: SpellingMistake[]
): PartOfContent[] => {
    var partOfContent: PartOfContent[] = [];
    let lines: string[] = md.split("\n");
    let start = 0;
    let line = 0;
    for (var spellingMistake of spellingMistakes) {
        if (line !== spellingMistake.range.line) {
            if (spellingMistake.range.startIdx === 0) {
                continue;
            } else {
                partOfContent.push({
                    content: lines[line].substring(start) + "\n" + lines[++line].substring(0, spellingMistake.range.startIdx)
                });
            }
        } else
            partOfContent.push({
                content: lines[line].substring(start, spellingMistake.range.startIdx)
            });
        start = spellingMistake.range.endIdx + 1;
        partOfContent.push({
            content: spellingMistake.original,
            advices: spellingMistake.advices
        });
    }
    return partOfContent;
}


const partsOfContent = async (md = ``): Promise<PartOfContent[]> =>
{
    const spellingMistakes: SpellingMistake[] = await checkSpelling_typo(md);
    console.log(spellingMistakes)
    return getPartsOfContent(md, spellingMistakes);
}

export default partsOfContent