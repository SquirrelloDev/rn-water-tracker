import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid'
export type Tip = {
    id: string
    title: string
    description: string
    imageName: string
}
const tips: Tip[] = [
    {
        id: uuidv4(),
        title: "Zaczynaj dzień od szklanki wody",
        description: "Budzisz się rano? Zanim sięgniesz po kawę, wypij szklankę wody. To najlepszy sposób, aby zacząć dzień świeżo i nawodnić organizm po nocnej przerwie.",
        imageName: require(`@/assets/woman-drinking-water-glass.jpg`),
    },
    {
        id: uuidv4(),
        title: "Woda z cytryną – Twoja poranna dawka energii",
        description: "Dodaj plasterki cytryny do swojej wody. Ten mały trik nie tylko nada napojowi orzeźwiający smak, ale także dostarczy witaminę C, która wspiera odporność i poprawia trawienie.",
        imageName: require(`@/assets/water-lemon.jpg`),
    },
    {
        id: uuidv4(),
        title: "Nie zapominaj o regularnym piciu w ciągu dnia",
        description: "Nawadniaj się regularnie przez cały dzień, a nie tylko wtedy, gdy czujesz pragnienie. Trzymaj butelkę z wodą zawsze pod ręką, aby łatwiej było pamiętać o piciu.",
        imageName: require(`@/assets/man-drinking-water.jpg`),
    },
    {
        id: uuidv4(),
        title: "Szukasz smaku? Wypróbuj napary ziołowe",
        description: "Jeśli czysta woda Cię nudzi, sięgnij po napary ziołowe. Mięta, rumianek czy melisa to doskonałe alternatywy, które dodadzą smaku bez dodatku cukru.",
        imageName: require(`@/assets/herbal-tea.jpg`),
    },
    {
        id: uuidv4(),
        title: "Postaw na soczyste owoce",
        description: "Arbuz, truskawki, ogórek – te owoce mają wysoką zawartość wody i są doskonałym sposobem na dodatkowe nawodnienie. Ciesz się nimi jako zdrową przekąską.",
        imageName: require(`@/assets/watermelon.jpg`),
    },
    {
        id: uuidv4(),
        title: "Woda kokosowa – naturalny izotonik",
        description: "Woda kokosowa to naturalny sposób na uzupełnienie elektrolitów po intensywnym treningu. Jest bogata w potas i inne minerały, które pomagają w regeneracji.",
        imageName: require(`@/assets/coconut-water.jpg`),
    },
    {
        id: uuidv4(),
        title: "Warzywa pełne wody w Twojej diecie",
        description: "Warzywa takie jak seler, sałata, cukinia i pomidory mają dużą zawartość wody. Dodaj je do swoich posiłków, aby łatwiej było utrzymać odpowiedni poziom nawodnienia.",
        imageName: require(`@/assets/tomatos.jpg`),
    },
    {
        id: uuidv4(),
        title: "Koktajle owocowe – smakowite źródło nawodnienia",
        description: "Przygotuj smoothie z ulubionych owoców i warzyw. To smaczny i zdrowy sposób na dostarczenie płynów oraz cennych witamin i minerałów.",
        imageName: require(`@/assets/fruit-smoothie.jpg`),
    },
    {
        id: uuidv4(),
        title: "Pij przed, w trakcie i po ćwiczeniach",
        description: "Aktywność fizyczna zwiększa zapotrzebowanie na płyny. Pamiętaj o piciu wody przed, w trakcie i po treningu, aby zapobiec odwodnieniu i wspomóc regenerację.",
        imageName: require(`@/assets/workout.jpg`),
    },
    {
        id: uuidv4(),
        title: "Unikaj nadmiaru kawy i herbaty",
        description: "Kofeina może działać moczopędnie, co zwiększa utratę płynów. Staraj się nie przesadzać z ilością kawy i herbaty, a zamiast tego sięgaj po wodę.",
        imageName: require(`@/assets/man-coffee.jpg`),
    },
    {
        id: uuidv4(),
        title: "Woda gazowana – odrobina bąbelków na orzeźwienie",
        description: "Jeśli lubisz gazowane napoje, wybierz wodę gazowaną. To świetna alternatywa dla słodkich, gazowanych napojów, która nadal dostarcza potrzebnej wody.",
        imageName: require(`@/assets/sparkling-water.jpg`),
    },
    {
        id: uuidv4(),
        title: "Zupy i buliony – płynne posiłki dla nawodnienia",
        description: "Włącz do diety zupy i buliony, które są nie tylko pożywne, ale także pomagają w nawodnieniu organizmu. Idealne na chłodne dni!",
        imageName: require(`@/assets/soup.jpg`),
    },
    {
        id: uuidv4(),
        title: "Ustal przypomnienia",
        description: "W zabieganym dniu łatwo zapomnieć o piciu wody. Ustal przypomnienia w telefonie, aby regularnie sięgać po szklankę wody i utrzymać nawodnienie.",
        imageName: require(`@/assets/notification.jpg`),
    },
    {
        id: uuidv4(),
        title: "Nie czekaj na pragnienie",
        description: "Pragnienie to sygnał, że Twój organizm jest już odwodniony. Pij regularnie, aby unikać tego stanu i dbać o stały poziom nawodnienia.",
        imageName: require(`@/assets/alert.jpg`),
    },
    {
        id: uuidv4(),
        title: "Bądź kreatywny z kostkami lodu",
        description: "Dodaj do kostek lodu owoce lub zioła. Kostki lodu z truskawkami, miętą czy cytrusami to nie tylko piękny widok, ale i orzeźwiający dodatek do wody.",
        imageName: require(`@/assets/ice.jpg`),
    }
]

export default tips