export type FaqQuestion = {
    question: string,
    answer: string
}
const faqQuestions: FaqQuestion[] = [
    {
        question: "Czym jest passa i jak działa?",
        answer: "Passa to wyznacznik tego, ile razy użytkownik osiągnął cel pod rząd. Jest to motywujący element, który pomaga śledzić postępy i utrzymywać zaangażowanie. Każde osiągnięcie celu zwiększa passę o jeden. Jeśli użytkownik nie osiągnie celu, passa jest resetowana do zera, co zachęca do regularnego działania i kontynuowania wysiłków."
    },
    {
        question: "Mam problem z aplikacją/napotkałem błąd",
        answer: "Jeśli napotkałeś problem z aplikacją lub zauważyłeś błąd, możesz go zgłosić w prosty sposób. Wystarczy kliknąć przycisk 'Zgłoś błąd' w aplikacji, a następnie postępować zgodnie z wyświetlaną instrukcją. Twoje zgłoszenie pomoże nam w szybszym naprawieniu problemu i ulepszeniu aplikacji."
    },
    {
        question: "Mam pewien pomysł z aplikacją? Jak mogę się zgłosić?",
        answer: "Jeżeli masz pomysł na ulepszenie aplikacji, chętnie go wysłuchamy! Aby zgłosić swoją propozycję, kliknij przycisk 'Zaproponuj funkcję' i postępuj zgodnie z instrukcjami. Twoje sugestie są dla nas bardzo cenne i mogą pomóc w tworzeniu jeszcze lepszej aplikacji dla wszystkich użytkowników."
    },
    {
        question: "Jak dostosować powiadomienia?",
        answer: "Możesz dostosować powiadomienia zgodnie ze swoimi preferencjami. W ustawieniach aplikacji znajdziesz opcje do regulowania interwałów między powiadomieniami, ustalania godzin wysyłania powiadomień oraz wybierania niestandardowych dźwięków. Aby włączyć tę funkcję, konieczne jest wyrażenie zgody na otrzymywanie powiadomień. Dzięki temu będziesz mógł zarządzać informacjami tak, aby najlepiej odpowiadały Twoim potrzebom."
    },
    {
        question: "Czy najwyższa passa się resetuje?",
        answer: "Nie, najwyższa passa się nie resetuje, chyba że użytkownik postanowi skasować dane. Jest to zapis Twojego najlepszego wyniku i pozostaje nienaruszona, nawet jeśli aktualna passa zostanie zresetowana."
    },
    {
        question: "Zapomniałem dodać celu na dany dzień a moja passa się zresetowała. Czy mogę ją jakoś odzyskać?",
        answer: "Niestety, nie ma możliwości odzyskania zresetowanej passy. Ważne jest, aby regularnie dodawać cele, aby utrzymać swoją passę."
    },
    {
        question: "Czy skasowanie celu w poprzednim dniu resetuje passę?",
        answer: "Tak, skasowanie celu w poprzednim dniu spowoduje reset passy. Upewnij się, że nie usuwasz celów, które są kluczowe dla Twojej passy."
    },
]
export default faqQuestions