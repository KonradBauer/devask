import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e")
    .replace(/ł/g, "l").replace(/ń/g, "n").replace(/ó/g, "o")
    .replace(/ś/g, "s").replace(/ź/g, "z").replace(/ż/g, "z")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const levels = ["L3", "L4", "L5", "L6", "Staff", null];

const technologies = [
  { name: "React", slug: "react", icon: "⚛️", question_count: 0 },
  { name: "JavaScript", slug: "javascript", icon: "🟨", question_count: 0 },
  { name: "Python", slug: "python", icon: "🐍", question_count: 0 },
  { name: "Java", slug: "java", icon: "☕", question_count: 0 },
  { name: "System Design", slug: "system-design", icon: "🏗️", question_count: 0 },
  { name: "TypeScript", slug: "typescript", icon: "📘", question_count: 0 },
  { name: "Node.js", slug: "nodejs", icon: "🟢", question_count: 0 },
  { name: "Go", slug: "go", icon: "🐹", question_count: 0 },
  { name: "Rust", slug: "rust", icon: "🦀", question_count: 0 },
  { name: "PHP", slug: "php", icon: "🐘", question_count: 0 },
  { name: "SQL", slug: "sql", icon: "🗃️", question_count: 0 },
  { name: "C++", slug: "cpp", icon: "⚙️", question_count: 0 },
  { name: "C#", slug: "csharp", icon: "🟣", question_count: 0 },
  { name: "Docker", slug: "docker", icon: "🐳", question_count: 0 },
  { name: "Kubernetes", slug: "kubernetes", icon: "☸️", question_count: 0 },
  { name: "AWS", slug: "aws", icon: "☁️", question_count: 0 },
  { name: "Angular", slug: "angular", icon: "🅰️", question_count: 0 },
  { name: "Vue.js", slug: "vuejs", icon: "💚", question_count: 0 },
  { name: "Swift", slug: "swift", icon: "🐦", question_count: 0 },
  { name: "Kotlin", slug: "kotlin", icon: "🟠", question_count: 0 },
  { name: "Ruby", slug: "ruby", icon: "💎", question_count: 0 },
  { name: "MongoDB", slug: "mongodb", icon: "🍃", question_count: 0 },
  { name: "GraphQL", slug: "graphql", icon: "◈", question_count: 0 },
  { name: "Linux", slug: "linux", icon: "🐧", question_count: 0 },
  { name: "Git", slug: "git", icon: "🔀", question_count: 0 },
  { name: "HTML/CSS", slug: "html-css", icon: "🎨", question_count: 0 },
  { name: "Next.js", slug: "nextjs", icon: "▲", question_count: 0 },
  { name: "Redis", slug: "redis", icon: "🔴", question_count: 0 },
  { name: "DevOps", slug: "devops", icon: "🔧", question_count: 0 },
];

interface RawQuestion {
  title: string;
  answer: string;
  difficulty: "junior" | "mid" | "senior";
}

const questionsMap: Record<string, RawQuestion[]> = {
  react: [
    { title: "Czym jest Virtual DOM i jak działa w React?", answer: "Virtual DOM to lekka kopia prawdziwego DOM przechowywana w pamięci. React porównuje nowy Virtual DOM z poprzednim (diffing), a następnie aktualizuje tylko zmienione elementy w prawdziwym DOM. Dzięki temu renderowanie jest wydajniejsze.", difficulty: "junior" },
    { title: "Jaka jest różnica między useEffect a useLayoutEffect?", answer: "useEffect wykonuje się asynchronicznie po renderowaniu i malowaniu ekranu. useLayoutEffect wykonuje się synchronicznie po renderowaniu, ale przed malowaniem. useLayoutEffect używamy gdy musimy zmierzyć lub zmodyfikować DOM przed wyświetleniem użytkownikowi.", difficulty: "mid" },
    { title: "Jak działa React Fiber i co zmienił w architekturze Reacta?", answer: "React Fiber to przepisany od zera silnik reconciliation. Wprowadził inkrementalne renderowanie — możliwość dzielenia pracy na kawałki i przerywania jej. Umożliwia priorytetyzację aktualizacji, co jest podstawą concurrent features w React 18+.", difficulty: "senior" },
    { title: "Czym są kontrolowane i niekontrolowane komponenty formularzy?", answer: "Kontrolowane komponenty przechowują stan formularza w React (przez useState) i aktualizują go przy każdej zmianie. Niekontrolowane komponenty korzystają z wewnętrznego stanu DOM i odczytują wartość przez ref. Kontrolowane dają pełną kontrolę nad walidacją i logiką formularza.", difficulty: "junior" },
    { title: "Wyjaśnij zasadę działania hooków useState i useReducer.", answer: "useState to prosty hook do zarządzania pojedynczą wartością stanu. useReducer przyjmuje reducer i akcje, jest lepszy przy złożonej logice stanu z wieloma powiązanymi wartościami. Oba powodują re-render komponentu po zmianie stanu.", difficulty: "junior" },
    { title: "Co to jest React Context i kiedy go używać?", answer: "React Context pozwala przekazywać dane przez drzewo komponentów bez prop drilling. Używamy go dla globalnych danych jak motyw, język czy dane użytkownika. Nie zastępuje state managera dla częstych aktualizacji, bo powoduje re-render wszystkich konsumentów.", difficulty: "mid" },
    { title: "Jak zoptymalizować wydajność komponentu React?", answer: "Kluczowe techniki to: React.memo do zapobiegania zbędnym re-renderom, useMemo/useCallback do memoizacji wartości i funkcji, lazy loading z Suspense, virtualizacja długich list (react-window), oraz unikanie niepotrzebnych zmian referencji w propsach.", difficulty: "mid" },
    { title: "Czym jest reconciliation w React?", answer: "Reconciliation to proces porównywania dwóch drzew Virtual DOM w celu określenia minimalnych zmian potrzebnych w prawdziwym DOM. React używa heurystyk: porównuje elementy tego samego typu, wykorzystuje klucze (key) do identyfikacji elementów na listach.", difficulty: "mid" },
    { title: "Jak działają Server Components w React 18+?", answer: "Server Components renderują się na serwerze i nie są wysyłane do klienta jako JavaScript. Mogą bezpośrednio czytać z bazy danych czy systemu plików. Redukują bundle size i poprawiają wydajność, ale nie mogą używać hooków stanu ani zdarzeń przeglądarki.", difficulty: "senior" },
    { title: "Opisz wzorzec Compound Components w React.", answer: "Compound Components to wzorzec gdzie grupa komponentów współdziała, dzieląc niejawny stan. Przykład to Select z Option — rodzic zarządza stanem, dzieci komunikują się przez Context. Daje elastyczny, deklaratywny API podobny do natywnych elementów HTML.", difficulty: "senior" },
  ],
  javascript: [
    { title: "Czym jest closure w JavaScript?", answer: "Closure to funkcja wraz z jej leksykalnym otoczeniem. Funkcja wewnętrzna ma dostęp do zmiennych funkcji zewnętrznej nawet po zakończeniu jej wykonywania. Closures są podstawą wielu wzorców: modułów, fabryk funkcji, callbacków.", difficulty: "junior" },
    { title: "Jaka jest różnica między var, let i const?", answer: "var ma scope funkcyjny i jest hoistowany z wartością undefined. let i const mają scope blokowy i są w temporal dead zone do deklaracji. const wymaga inicjalizacji i nie pozwala na ponowne przypisanie (ale obiekty mogą być mutowane).", difficulty: "junior" },
    { title: "Jak działa event loop w JavaScript?", answer: "Event loop sprawdza stos wywołań (call stack) — jeśli jest pusty, pobiera zadania z kolejki. Microtasks (Promise, queueMicrotask) mają wyższy priorytet niż macrotasks (setTimeout, setInterval). Po każdym macrotasku przetwarzane są wszystkie microtaski.", difficulty: "mid" },
    { title: "Wyjaśnij prototypowe dziedziczenie w JavaScript.", answer: "Każdy obiekt w JS ma wewnętrzny prototyp ([[Prototype]]). Gdy dostęp do właściwości nie powiedzie się na obiekcie, silnik szuka w łańcuchu prototypów. Object.create() tworzy obiekt z danym prototypem, a klasy ES6 to syntactic sugar nad tym mechanizmem.", difficulty: "mid" },
    { title: "Co to jest Promise i jak obsługiwać błędy asynchroniczne?", answer: "Promise to obiekt reprezentujący przyszłą wartość — może być pending, fulfilled lub rejected. Obsługujemy go przez .then()/.catch() lub async/await z try/catch. Nieobsłużone rejekcje powodują UnhandledPromiseRejection.", difficulty: "junior" },
    { title: "Czym są generatory i iteratory w JavaScript?", answer: "Iteratory to obiekty z metodą next() zwracającą {value, done}. Generatory (function*) to funkcje, które można wstrzymywać i wznawiać za pomocą yield. Są podstawą wielu bibliotek (redux-saga) i umożliwiają leniwe generowanie sekwencji.", difficulty: "mid" },
    { title: "Jak działa this w JavaScript?", answer: "Wartość this zależy od kontekstu wywołania: w metodzie — obiekt, w funkcji — window/undefined (strict), w arrow function — dziedziczy z otaczającego scope. call/apply/bind pozwalają jawnie ustawić this. W klasach metody tracą kontekst przy destrukturyzacji.", difficulty: "mid" },
    { title: "Wyjaśnij różnicę między == a === w JavaScript.", answer: "== porównuje z koercją typów (np. '5' == 5 to true). === porównuje bez koercji — wartość i typ muszą się zgadzać. Zaleca się używanie === aby unikać nieintuicyjnych konwersji. Jedyny wyjątek to null == undefined.", difficulty: "junior" },
    { title: "Co to jest WeakMap i WeakSet i do czego służą?", answer: "WeakMap i WeakSet przechowują słabe referencje do obiektów — nie zapobiegają garbage collection. WeakMap ma klucze obiektowe, WeakSet przechowuje obiekty. Używane do prywatnych danych, cache'owania metadanych i śledzenia obiektów bez wycieków pamięci.", difficulty: "senior" },
    { title: "Jak działa Proxy i Reflect w JavaScript?", answer: "Proxy tworzy wrapper wokół obiektu, przechwytujący operacje (get, set, delete itp.) przez handlery (traps). Reflect to zbiór metod odpowiadających trapom Proxy. Używane do walidacji, logowania, reaktywności (Vue 3) i metaprogramowania.", difficulty: "senior" },
  ],
  python: [
    { title: "Czym jest GIL w Pythonie i jak wpływa na wielowątkowość?", answer: "GIL (Global Interpreter Lock) to mutex pozwalający tylko jednemu wątkowi wykonywać bytecode Pythona naraz. Ogranicza wydajność wątków CPU-bound, ale nie wpływa na I/O-bound. Obejście: multiprocessing, asyncio, lub interpretery bez GIL (np. nogil).", difficulty: "mid" },
    { title: "Jaka jest różnica między listą a krotką w Pythonie?", answer: "Lista jest mutowalna (można dodawać/usuwać elementy), krotka jest niemutowalna. Krotki są szybsze, zużywają mniej pamięci i mogą być kluczami słownika. Listy używamy gdy dane się zmieniają, krotki dla stałych kolekcji.", difficulty: "junior" },
    { title: "Wyjaśnij dekoratory w Pythonie.", answer: "Dekorator to funkcja przyjmująca inną funkcję i zwracająca jej zmodyfikowaną wersję. Składnia @dekorator to syntactic sugar dla func = dekorator(func). Używane do logowania, cache'owania (functools.cache), autoryzacji i modyfikacji zachowania bez zmiany kodu.", difficulty: "mid" },
    { title: "Co to jest list comprehension i generator expression?", answer: "List comprehension tworzy listę w jednym wyrażeniu: [x**2 for x in range(10)]. Generator expression (x**2 for x in range(10)) tworzy leniwy iterator — nie alokuje pamięci na wszystkie elementy. Generator jest lepszy dla dużych zbiorów danych.", difficulty: "junior" },
    { title: "Jak działa zarządzanie pamięcią w Pythonie?", answer: "Python używa reference counting jako głównego mechanizmu — obiekt jest usuwany gdy licznik referencji spadnie do 0. Cykliczny garbage collector wykrywa cykle referencji. Alokator pymalloc optymalizuje małe obiekty. Moduł gc pozwala kontrolować kolekcję.", difficulty: "senior" },
    { title: "Czym są *args i **kwargs?", answer: "*args pozwala przekazać dowolną liczbę argumentów pozycyjnych jako krotkę. **kwargs pozwala przekazać dowolne argumenty nazwane jako słownik. Używane do tworzenia elastycznych funkcji i dekoratorów, oraz do przekazywania argumentów dalej.", difficulty: "junior" },
    { title: "Wyjaśnij różnicę między deepcopy a shallow copy.", answer: "Shallow copy tworzy nowy obiekt, ale wewnętrzne referencje wskazują na te same obiekty. Deepcopy rekurencyjnie kopiuje wszystkie zagnieżdżone obiekty. copy.copy() robi shallow copy, copy.deepcopy() robi deep copy. Ważne przy zagnieżdżonych strukturach danych.", difficulty: "mid" },
    { title: "Co to jest metaclass w Pythonie?", answer: "Metaclass to klasa, której instancjami są klasy — definiuje jak klasy są tworzone. type jest domyślną metaclasą. Metaclasy pozwalają modyfikować tworzenie klas: dodawać metody, walidować atrybuty, rejestrować klasy. Używane w ORM-ach (Django models) i frameworkach.", difficulty: "senior" },
    { title: "Jak działają context managers (with statement)?", answer: "Context manager to obiekt z metodami __enter__ i __exit__. Statement with automatycznie wywołuje setup i cleanup. contextlib.contextmanager pozwala tworzyć je z generatorów. Używane do zarządzania zasobami: plikami, połączeniami DB, lockami.", difficulty: "mid" },
    { title: "Czym jest asyncio i jak działa asynchroniczność w Pythonie?", answer: "asyncio to biblioteka do pisania kodu asynchronicznego z jednym wątkiem. Używa event loop, coroutines (async/await) i tasków. Nie tworzy nowych wątków — przełącza się między zadaniami przy await. Idealne do I/O-bound: HTTP, DB, system plików.", difficulty: "mid" },
  ],
  java: [
    { title: "Jaka jest różnica między interfejsem a klasą abstrakcyjną w Javie?", answer: "Klasa abstrakcyjna może mieć stan (pola) i implementacje metod, klasa dziedziczy po jednej. Interfejs definiuje kontrakt, może mieć default methods (od Java 8), klasa implementuje wiele interfejsów. Interfejsy preferowane dla polimorfizmu, klasy abstrakcyjne dla współdzielonego kodu.", difficulty: "junior" },
    { title: "Jak działa garbage collector w JVM?", answer: "GC automatycznie zwalnia pamięć obiektów bez referencji. JVM dzieli heap na generacje: Young (Eden + Survivor) i Old. Minor GC czyści Young, Major/Full GC — Old. Algorytmy: G1 (domyślny), ZGC (niskie pauzy), Shenandoah. GC tuning wpływa na wydajność.", difficulty: "mid" },
    { title: "Wyjaśnij różnice między HashMap, TreeMap i LinkedHashMap.", answer: "HashMap: O(1) dostęp, brak kolejności. TreeMap: posortowana wg klucza (Red-Black Tree), O(log n). LinkedHashMap: zachowuje kolejność wstawiania, O(1). HashMap do szybkiego dostępu, TreeMap do sortowania, LinkedHashMap do zachowania kolejności.", difficulty: "mid" },
    { title: "Co to jest Spring IoC Container i jak działa Dependency Injection?", answer: "IoC Container zarządza cyklem życia beanów i ich zależnościami. DI to wzorzec gdzie zależności są dostarczane z zewnątrz zamiast tworzone w klasie. Spring wspiera constructor, setter i field injection. Constructor injection jest zalecany — wymusza kompletność zależności.", difficulty: "mid" },
    { title: "Czym jest JVM, JRE i JDK?", answer: "JVM (Java Virtual Machine) wykonuje bytecode. JRE (Runtime Environment) to JVM + biblioteki standardowe — do uruchamiania programów. JDK (Development Kit) to JRE + kompilator (javac), debugger i narzędzia — do tworzenia programów.", difficulty: "junior" },
    { title: "Jak działają wątki i synchronizacja w Javie?", answer: "Wątki tworzymy przez Thread/Runnable lub ExecutorService. synchronized blokuje dostęp do sekcji krytycznej. volatile zapewnia widoczność zmian. java.util.concurrent oferuje Lock, Semaphore, ConcurrentHashMap i inne narzędzia do bezpiecznej współbieżności.", difficulty: "mid" },
    { title: "Co to jest Stream API w Javie i jak go używać?", answer: "Stream API (Java 8+) to funkcyjny sposób przetwarzania kolekcji. Operacje pośrednie (filter, map, sorted) są leniwe. Terminalne (collect, forEach, reduce) uruchamiają pipeline. parallelStream() umożliwia przetwarzanie równoległe. Nie modyfikuje źródła danych.", difficulty: "junior" },
    { title: "Wyjaśnij wzorzec Singleton i jego implementację w Javie.", answer: "Singleton zapewnia jedną instancję klasy. Bezpieczna implementacja: enum (najlepsza, thread-safe, serializable), lub double-checked locking z volatile. Prywatny konstruktor blokuje tworzenie instancji. Uwaga: utrudnia testowanie i łamie SOLID.", difficulty: "mid" },
    { title: "Jak działa Class Loading w JVM?", answer: "ClassLoader ładuje klasy na żądanie. Hierarchia: Bootstrap (rt.jar), Extension, Application. Delegacja parent-first — rodzic próbuje pierwszy. Custom ClassLoadery umożliwiają ładowanie z niestandardowych źródeł. Klasa jest unikalna w kontekście swojego ClassLoadera.", difficulty: "senior" },
    { title: "Co to jest Project Loom i virtual threads?", answer: "Project Loom wprowadza virtual threads — lekkie wątki zarządzane przez JVM, nie OS. Miliony virtual threads mogą działać równocześnie. Blokujące operacje I/O nie blokują wątku OS. Upraszcza programowanie współbieżne bez potrzeby reaktywnych frameworków.", difficulty: "senior" },
  ],
  "system-design": [
    { title: "Jak zaprojektować system skracania URL (np. bit.ly)?", answer: "Generuj krótki identyfikator (base62 z auto-increment ID lub hash). Przechowuj mapowanie short→long w bazie. Cache popularne URL-e w Redis. Przekierowanie 301/302. Skalowanie: sharding po hash, CDN dla przekierowań, rate limiting per IP.", difficulty: "mid" },
    { title: "Wyjaśnij twierdzenie CAP.", answer: "CAP: w systemie rozproszonym można mieć max 2 z 3: Consistency (każdy odczyt widzi najnowszy zapis), Availability (każde żądanie dostaje odpowiedź), Partition tolerance (system działa mimo awarii sieci). W praktyce partycje są nieuniknione, więc wybieramy CP lub AP.", difficulty: "mid" },
    { title: "Jak zaprojektować system czatu w czasie rzeczywistym?", answer: "WebSocket do komunikacji real-time. Serwery czatu za load balancerem z sticky sessions lub pub/sub (Redis). Wiadomości w DB z partycjonowaniem po conversation_id. Kolejka (Kafka) do powiadomień. Presence service dla statusu online. CDN dla mediów.", difficulty: "senior" },
    { title: "Co to jest load balancing i jakie są algorytmy?", answer: "Load balancer rozdziela ruch między serwery. Algorytmy: Round Robin (po kolei), Weighted RR (z wagami), Least Connections (najmniej obciążony), IP Hash (stałe przypisanie). L4 działa na TCP, L7 na HTTP. Popularne: Nginx, HAProxy, AWS ALB.", difficulty: "junior" },
    { title: "Jak zaprojektować system rate limitingu?", answer: "Algorytmy: Token Bucket (stała szybkość, burst), Sliding Window (dokładny, więcej pamięci), Fixed Window (prosty, spike na granicy). Implementacja: Redis z INCR+EXPIRE lub Lua script. Per-user, per-IP lub per-endpoint. Odpowiedź 429 z Retry-After header.", difficulty: "mid" },
    { title: "Wyjaśnij różnicę między monolitem a mikroserwisami.", answer: "Monolit: jedna aplikacja, prostsze wdrożenie i debugging, ale trudne skalowanie i deploy. Mikroserwisy: niezależne serwisy komunikujące się przez API/eventy, osobne deploje i skalowanie, ale złożoność operacyjna (discovery, tracing, saga). Zaczynaj od monolitu, dziel gdy potrzeba.", difficulty: "junior" },
    { title: "Jak zaprojektować system powiadomień push?", answer: "API przyjmuje żądanie powiadomienia → walidacja → kolejka (Kafka/SQS). Workery pobierają z kolejki, grupują per-user. Delivery: APNs (iOS), FCM (Android), WebSocket (web). Retry z exponential backoff. Preferencje usera (opt-in/out). Analytics: delivery/open rate.", difficulty: "senior" },
    { title: "Co to jest CQRS i Event Sourcing?", answer: "CQRS rozdziela model zapisu (Command) od odczytu (Query) — optymalizacja niezależna. Event Sourcing zapisuje zdarzenia zamiast stanu — stan odtwarzany przez replay. Razem: komendy produkują eventy, projekcje budują widoki do odczytu. Złożone, ale daje pełną historię i audyt.", difficulty: "senior" },
    { title: "Jak działa consistent hashing?", answer: "Consistent hashing mapuje klucze i węzły na pierścień (hash ring). Klucz trafia do najbliższego węzła zgodnie z ruchem wskazówek zegara. Dodanie/usunięcie węzła przesuwa tylko sąsiednie klucze. Virtual nodes wyrównują obciążenie. Używane w Cassandra, DynamoDB, CDN.", difficulty: "mid" },
    { title: "Jak zaprojektować news feed (np. Facebook)?", answer: "Dwa podejścia: push (fan-out on write — zapis do feedu każdego followera) lub pull (fan-out on read — agregacja przy odczycie). Hybryda: push dla zwykłych userów, pull dla celebrytów. Cache feedu w Redis. Ranking: chronologiczny + ML. Paginacja cursor-based.", difficulty: "senior" },
  ],
  typescript: [
    { title: "Czym jest TypeScript i jakie problemy rozwiązuje?", answer: "TypeScript to nadzbiór JavaScriptu dodający statyczne typowanie. Wykrywa błędy na etapie kompilacji, poprawia autouzupełnianie w IDE, dokumentuje kod przez typy. Kompiluje się do JS i jest w pełni kompatybilny z ekosystemem JavaScript.", difficulty: "junior" },
    { title: "Jaka jest różnica między interface a type w TypeScript?", answer: "Oba definiują kształt danych. Interface: rozszerzalny (declaration merging), extends do dziedziczenia. Type: union/intersection types, mapped types, conditional types. Interfejsy dla obiektów i klas, type aliases dla złożonych typów i unii.", difficulty: "junior" },
    { title: "Wyjaśnij typy generyczne (generics) w TypeScript.", answer: "Generyki to parametryzowane typy umożliwiające tworzenie reużywalnego, type-safe kodu. function identity<T>(arg: T): T zachowuje typ. Constraints (extends) ograniczają T. Generyki w interfejsach, klasach i typach warunkowych. Kluczowe dla bibliotek.", difficulty: "mid" },
    { title: "Co to są conditional types i jak ich używać?", answer: "Conditional types: T extends U ? X : Y — wybierają typ na podstawie warunku. infer wyciąga typy wewnętrzne. Przykład: ReturnType<T> wyciąga typ zwracany funkcji. Distributed conditional types działają na union types element po elemencie.", difficulty: "senior" },
    { title: "Jak działają mapped types i utility types?", answer: "Mapped types transformują właściwości: {[K in keyof T]: ...}. Utility types: Partial<T> (opcjonalne), Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>. Modyfikatory +/- readonly i ?. Pozwalają tworzyć nowe typy z istniejących bez duplikacji.", difficulty: "mid" },
    { title: "Czym jest strict mode w TypeScript i co obejmuje?", answer: "strict: true włącza zestaw flag: strictNullChecks (null/undefined osobne typy), noImplicitAny, strictFunctionTypes, strictBindCallApply i inne. Wymusza precyzyjne typowanie, eliminuje wiele kategorii błędów. Zalecane dla nowych projektów.", difficulty: "mid" },
    { title: "Wyjaśnij discriminated unions w TypeScript.", answer: "Discriminated union to union type z wspólnym polem literałowym (discriminant). TypeScript zawęża typ na podstawie tego pola w if/switch. Wzorzec: type Shape = Circle | Square, każdy z polem kind. Bezpieczne, wyczerpujące pattern matching.", difficulty: "mid" },
    { title: "Co to jest template literal type?", answer: "Template literal types tworzą typy ze stringów: type Route = `/api/${string}`. Mogą łączyć union types: type Event = `${Action}_${Entity}` generuje wszystkie kombinacje. Używane do typowania tras, kluczy CSS, event names.", difficulty: "senior" },
  ],
  nodejs: [
    { title: "Czym jest Node.js i czym różni się od przeglądarki?", answer: "Node.js to środowisko uruchomieniowe JavaScript na serwerze, oparte na V8. W odróżnieniu od przeglądarki: brak DOM/window, dostęp do systemu plików, sieci i procesów. Single-threaded z event loop, świetny do I/O-bound aplikacji.", difficulty: "junior" },
    { title: "Jak działa event loop w Node.js?", answer: "Event loop w Node.js ma fazy: timers (setTimeout), pending callbacks, idle/prepare, poll (I/O), check (setImmediate), close. Microtasks (Promise, process.nextTick) wykonują się między fazami. nextTick ma wyższy priorytet niż Promise.resolve().", difficulty: "mid" },
    { title: "Czym jest Stream w Node.js?", answer: "Streamy to abstrakcja do przetwarzania danych kawałkami bez ładowania całości do pamięci. Typy: Readable, Writable, Duplex, Transform. pipe() łączy streamy. Używane do plików, HTTP, kompresji. Backpressure zapobiega przepełnieniu buforów.", difficulty: "mid" },
    { title: "Jak obsługiwać błędy w Node.js?", answer: "Synchroniczne: try/catch. Asynchroniczne (callback): error-first pattern. Promise: .catch() lub async/await z try/catch. EventEmitter: event 'error'. Globalnie: process.on('uncaughtException') i 'unhandledRejection'. W produkcji: graceful shutdown i restart.", difficulty: "mid" },
    { title: "Czym jest cluster module i jak skalować Node.js?", answer: "Cluster tworzy procesy worker na każdy rdzeń CPU, dzielące port. Master zarządza workerami. PM2 upraszcza cluster management. Alternatywy: worker_threads dla CPU-bound, load balancer (Nginx) przed wieloma instancjami, horizontal scaling z kontenerami.", difficulty: "senior" },
    { title: "Wyjaśnij middleware w Express.js.", answer: "Middleware to funkcja (req, res, next) wykonywana w łańcuchu żądania. next() przekazuje do następnego middleware. Typy: aplikacyjne, routerowe, obsługi błędów (4 argumenty), wbudowane (express.json). Kolejność rejestracji ma znaczenie.", difficulty: "junior" },
    { title: "Jak działa moduł worker_threads?", answer: "worker_threads umożliwia prawdziwą wielowątkowość w Node.js dla operacji CPU-bound. Każdy worker ma własny event loop i V8. Komunikacja przez MessageChannel/MessagePort. SharedArrayBuffer pozwala dzielić pamięć. Nie zastępuje cluster — inny use case.", difficulty: "senior" },
    { title: "Czym jest package.json i jak działa npm?", answer: "package.json definiuje metadane projektu, zależności (dependencies/devDependencies) i skrypty. npm install pobiera pakiety do node_modules. package-lock.json zapewnia determinizm. Semver: ^1.2.3 pozwala na minor updates, ~1.2.3 na patch.", difficulty: "junior" },
  ],
  go: [
    { title: "Czym są goroutines i czym różnią się od wątków OS?", answer: "Goroutines to lekkie wątki zarządzane przez Go runtime. Startują z ~2KB stosu (vs MB dla wątków OS). Go scheduler mapuje tysiące goroutines na mniejszą liczbę wątków OS (M:N scheduling). Tworzenie: go func(). Tanie — można mieć miliony.", difficulty: "junior" },
    { title: "Jak działają kanały (channels) w Go?", answer: "Channels to typowane rurociągi do komunikacji między goroutines. ch := make(chan int) — unbuffered (synchroniczny), make(chan int, 10) — buffered. <- operator do wysyłania i odbierania. select pozwala czekać na wiele kanałów. Zamykanie: close(ch).", difficulty: "mid" },
    { title: "Wyjaśnij interfejsy w Go.", answer: "Interfejsy w Go definiują zestaw metod — każdy typ implementujący te metody automatycznie spełnia interfejs (duck typing). Puste interfejsy interface{} (od Go 1.18: any) przyjmują dowolny typ. Interfejsy umożliwiają polimorfizm bez dziedziczenia.", difficulty: "mid" },
    { title: "Jak działa garbage collector w Go?", answer: "Go GC jest concurrent, tri-color mark-and-sweep. Działa równolegle z aplikacją, minimalizując pauzy (sub-millisecond). Sterta jest skanowana w tle. GOGC kontroluje agresywność (domyślnie 100%). Go 1.19+ ma soft memory limit przez GOMEMLIMIT.", difficulty: "senior" },
    { title: "Co to jest defer i jak działa?", answer: "defer odkłada wykonanie funkcji do momentu powrotu z funkcji otaczającej. Argumenty ewaluowane natychmiast, wywołanie odłożone. Wiele defers — LIFO (stos). Używane do cleanup: zamykanie plików, unlock mutexów, recovery z panic.", difficulty: "junior" },
    { title: "Wyjaśnij error handling w Go.", answer: "Go nie ma wyjątków — błędy to wartości (interface error). Funkcje zwracają (result, error). Sprawdzanie: if err != nil. errors.Is/As do porównywania i wyciągania typów. fmt.Errorf z %w do wrappowania. panic/recover tylko dla krytycznych błędów.", difficulty: "mid" },
    { title: "Czym są generyki w Go (od wersji 1.18)?", answer: "Generyki pozwalają parametryzować funkcje i typy: func Map[T any, U any](s []T, f func(T) U) []U. Constraints definiują wymagania: comparable, constraints.Ordered. Interface constraints mogą zawierać typy (~int). Eliminują duplikację kodu i potrzebę interface{}.", difficulty: "mid" },
    { title: "Jak działa Go scheduler?", answer: "Go scheduler używa modelu GMP: G (goroutine), M (wątek OS), P (procesor logiczny). GOMAXPROCS ustawia liczbę P. Work stealing — idle P kradnie goroutines z kolejki innego P. Preemptive scheduling od Go 1.14 — goroutines nie blokują schedulera.", difficulty: "senior" },
  ],
  rust: [
    { title: "Czym jest ownership w Rust i dlaczego jest ważny?", answer: "Ownership to system zarządzania pamięcią bez garbage collectora. Reguły: każda wartość ma jednego właściciela, wartość jest zwalniana gdy właściciel wychodzi z scope. Move semantics przenosi ownership. Zapewnia bezpieczeństwo pamięci w compile time.", difficulty: "junior" },
    { title: "Wyjaśnij borrowing i lifetimes w Rust.", answer: "Borrowing pozwala na referencje bez przenoszenia ownership: &T (shared, wiele naraz) lub &mut T (exclusive, jedna naraz). Lifetimes ('a) to adnotacje gwarantujące że referencje nie przeżyją danych. Kompilator często je dedukuje (lifetime elision).", difficulty: "mid" },
    { title: "Czym jest trait w Rust?", answer: "Trait definiuje zestaw metod — podobny do interfejsu. Typy implementują trait: impl Trait for Type. Trait bounds ograniczają generyki: fn func<T: Display>(x: T). Trait objects (dyn Trait) umożliwiają dynamic dispatch. Orphan rule ogranicza implementację obcych traitów.", difficulty: "mid" },
    { title: "Jak działa enum i pattern matching w Rust?", answer: "Enum w Rust to algebraiczny typ danych — warianty mogą zawierać dane: enum Result<T,E> { Ok(T), Err(E) }. match wymusza obsługę wszystkich wariantów. if let i while let do częściowego matchowania. Option<T> i Result<T,E> to fundamenty error handling.", difficulty: "junior" },
    { title: "Wyjaśnij async/await w Rust.", answer: "async fn zwraca Future — leniwy typ wymagający executora (tokio, async-std). .await wstrzymuje wykonanie aż Future się zakończy. Brak runtime w standardowej bibliotece — executor dostarczany przez crate. Pin i Unpin zapewniają bezpieczeństwo self-referential futures.", difficulty: "senior" },
    { title: "Co to jest unsafe w Rust i kiedy go używać?", answer: "unsafe blok pozwala: dereferencję surowych wskaźników, wywoływanie unsafe funkcji, dostęp do mutable static, implementację unsafe trait. Używane w FFI, niskopoziomowych optymalizacjach i abstrakcjach. unsafe nie wyłącza borrow checkera — tylko rozszerza dostępne operacje.", difficulty: "senior" },
    { title: "Czym jest smart pointer w Rust?", answer: "Smart pointery to typy zarządzające pamięcią: Box<T> (heap allocation), Rc<T> (reference counting), Arc<T> (atomic RC, thread-safe), RefCell<T> (runtime borrow checking). Implementują Deref i Drop. Pozwalają na wzorce niemożliwe z zwykłymi referencjami.", difficulty: "mid" },
  ],
  php: [
    { title: "Jaka jest różnica między == a === w PHP?", answer: "== porównuje wartości z rzutowaniem typów (np. '5' == 5 to true, 0 == 'abc' to true w starszych wersjach). === porównuje wartość i typ bez konwersji. Zawsze preferuj === aby unikać nieintuicyjnych wyników type juggling.", difficulty: "junior" },
    { title: "Wyjaśnij cykl życia żądania w Laravel.", answer: "Żądanie: public/index.php → bootstrap → service container → HTTP kernel → middleware → router → controller → response → middleware (odwrotnie) → odpowiedź klientowi. Service providers rejestrują się przy starcie. Middleware filtrują żądania.", difficulty: "mid" },
    { title: "Czym jest Composer i jak zarządza zależnościami?", answer: "Composer to menedżer zależności PHP. composer.json deklaruje pakiety, composer install/update pobiera je do vendor/. Autoloading (PSR-4) automatycznie ładuje klasy. composer.lock zapewnia determinizm. Packagist to domyślne repozytorium.", difficulty: "junior" },
    { title: "Jak działa type system w PHP 8+?", answer: "PHP 8 ma union types (int|string), named arguments, match expression, nullsafe operator (?->). PHP 8.1: enum, intersection types, fibers, readonly properties. PHP 8.2: readonly classes, DNF types. PHP ewoluuje ku silnemu typowaniu z zachowaniem dynamiczności.", difficulty: "mid" },
    { title: "Wyjaśnij wzorzec Repository w kontekście PHP/Laravel.", answer: "Repository abstrahuje dostęp do danych — interfejs definiuje metody (find, save, delete), implementacja korzysta z Eloquent/Doctrine. Pozwala zamienić źródło danych bez zmiany logiki biznesowej. W Laravel: bind interface w Service Container, inject w kontrolerach.", difficulty: "mid" },
    { title: "Czym jest OPcache i jak przyspiesza PHP?", answer: "OPcache kompiluje skrypty PHP do opcode i cache'uje w pamięci współdzielonej. Eliminuje parsing i kompilację przy każdym żądaniu. PHP 8+ ma JIT compiler na bazie OPcache. Konfiguracja: opcache.memory_consumption, validate_timestamps. Krytyczne dla wydajności produkcyjnej.", difficulty: "senior" },
    { title: "Jak obsługiwać sesje w PHP?", answer: "session_start() tworzy/wznawia sesję. Dane w $_SESSION. Session ID w cookie PHPSESSID. Domyślnie plikowy storage — dla skalowania: Redis, Memcached, DB. session.gc_maxlifetime kontroluje wygasanie. Zabezpieczenia: session_regenerate_id(), httpOnly cookies.", difficulty: "junior" },
  ],
  sql: [
    { title: "Jaka jest różnica między INNER JOIN a LEFT JOIN?", answer: "INNER JOIN zwraca tylko wiersze z dopasowaniem w obu tabelach. LEFT JOIN zwraca wszystkie wiersze z lewej tabeli i dopasowane z prawej (NULL gdy brak). RIGHT JOIN odwrotnie. FULL OUTER JOIN — wszystkie wiersze z obu tabel.", difficulty: "junior" },
    { title: "Wyjaśnij indeksy w bazach danych.", answer: "Indeks to struktura danych (B-tree, hash) przyspieszająca wyszukiwanie. CREATE INDEX tworzy indeks na kolumnie. Przyspiesza SELECT/WHERE/JOIN, ale spowalnia INSERT/UPDATE. Typy: unique, composite, covering, partial. EXPLAIN analizuje użycie indeksów.", difficulty: "mid" },
    { title: "Co to są transakcje i ACID?", answer: "Transakcja to grupa operacji wykonywanych atomowo. ACID: Atomicity (wszystko albo nic), Consistency (reguły integralności), Isolation (transakcje nie widzą się nawzajem), Durability (zatwierdzone dane przetrwają awarię). Poziomy izolacji: READ COMMITTED, REPEATABLE READ, SERIALIZABLE.", difficulty: "mid" },
    { title: "Czym jest normalizacja bazy danych?", answer: "Normalizacja eliminuje redundancję danych. 1NF: atomowe wartości. 2NF: brak zależności częściowych. 3NF: brak zależności przechodnich. BCNF: każdy determinant to klucz kandydujący. Denormalizacja celowa dla wydajności odczytu (raportowanie, OLAP).", difficulty: "mid" },
    { title: "Jak działa window function w SQL?", answer: "Window functions obliczają wartości na zestawie wierszy powiązanych z bieżącym: ROW_NUMBER(), RANK(), SUM() OVER(PARTITION BY ... ORDER BY ...). Nie grupują wierszy jak GROUP BY. ROWS BETWEEN definiuje ramkę okna. Kluczowe dla raportów i analityki.", difficulty: "senior" },
    { title: "Jaka jest różnica między WHERE a HAVING?", answer: "WHERE filtruje wiersze przed grupowaniem (GROUP BY). HAVING filtruje grupy po agregacji. WHERE nie może używać funkcji agregujących (SUM, COUNT), HAVING może. Kolejność: WHERE → GROUP BY → HAVING → SELECT.", difficulty: "junior" },
    { title: "Wyjaśnij deadlock w bazach danych.", answer: "Deadlock występuje gdy dwie transakcje wzajemnie czekają na zwolnienie zasobów zablokowanych przez drugą. Baza wykrywa deadlock i rollbackuje jedną transakcję. Zapobieganie: spójna kolejność blokowania, krótkie transakcje, odpowiedni poziom izolacji.", difficulty: "senior" },
    { title: "Co to jest CTE (Common Table Expression)?", answer: "CTE to nazwane, tymczasowe wyniki zapytania definiowane przez WITH. Poprawiają czytelność złożonych zapytań. Recursive CTE umożliwia przetwarzanie hierarchii (drzewa, grafy). Przykład: WITH cte AS (SELECT ...) SELECT * FROM cte.", difficulty: "mid" },
  ],
  cpp: [
    { title: "Czym jest RAII w C++?", answer: "RAII (Resource Acquisition Is Initialization) to wzorzec wiążący zasoby z cyklem życia obiektu. Konstruktor pozyskuje zasób, destruktor zwalnia. Smart pointery (unique_ptr, shared_ptr) to RAII dla pamięci. Gwarantuje cleanup nawet przy wyjątkach.", difficulty: "mid" },
    { title: "Jaka jest różnica między unique_ptr, shared_ptr i weak_ptr?", answer: "unique_ptr: wyłączna własność, brak kopii, move-only. shared_ptr: współdzielona własność, reference counting, overhead atomowy. weak_ptr: nie-własnościowa referencja do shared_ptr, zapobiega cyklom. unique_ptr preferowany gdy jeden właściciel.", difficulty: "mid" },
    { title: "Wyjaśnij move semantics w C++11.", answer: "Move semantics pozwala przenosić zasoby zamiast kopiować. Rvalue references (&&) identyfikują tymczasowe obiekty. std::move castuje na rvalue. Move constructor/assignment przenoszą ownership zasobów. Eliminuje zbędne kopie — kluczowe dla wydajności kontenerów.", difficulty: "senior" },
    { title: "Co to jest virtual function i vtable?", answer: "Virtual function umożliwia polimorfizm — wywołanie zależy od typu runtime obiektu, nie wskaźnika. vtable to tablica wskaźników do virtual functions, tworzona per-klasa. Obiekt ma vptr wskazujący na vtable swojej klasy. Overhead: jeden wskaźnik per obiekt.", difficulty: "mid" },
    { title: "Czym są templates w C++?", answer: "Templates to mechanizm generowania kodu na etapie kompilacji. Function templates i class templates parametryzują typami. Specjalizacja pozwala na warianty dla konkretnych typów. SFINAE i concepts (C++20) ograniczają parametry. Kod generowany dopiero przy instancjacji.", difficulty: "mid" },
    { title: "Jaka jest różnica między stack a heap?", answer: "Stack: automatyczna alokacja, szybka (przesunięcie wskaźnika), ograniczony rozmiar, LIFO. Heap: dynamiczna alokacja (new/malloc), wolniejsza, fragmentacja, dowolny rozmiar. W C++ preferuj stack; heap przez smart pointery gdy potrzeba dynamicznego czasu życia.", difficulty: "junior" },
    { title: "Wyjaśnij undefined behavior w C++.", answer: "UB to kod bez zdefiniowanego wyniku wg standardu: dereferencja nullptr, buffer overflow, signed integer overflow, use-after-free. Kompilator może zoptymalizować zakładając brak UB. Sanitizery (ASan, UBSan) i narzędzia statyczne wykrywają UB.", difficulty: "senior" },
  ],
  csharp: [
    { title: "Czym jest LINQ i jak działa?", answer: "LINQ (Language Integrated Query) to składnia zapytań wbudowana w C#. Dwa style: query syntax (from x in...) i method syntax (.Where().Select()). Działa na IEnumerable i IQueryable. IQueryable tłumaczy na SQL (Entity Framework). Deferred execution — leniwa ewaluacja.", difficulty: "junior" },
    { title: "Jaka jest różnica między struct a class w C#?", answer: "class: typ referencyjny, heap, dziedziczenie, null. struct: typ wartościowy, stack (zazwyczaj), brak dziedziczenia, kopiowanie przy przypisaniu. struct dla małych, niemutowalnych danych (Point, DateTime). record (C# 9+): wartościowa semantyka porównania.", difficulty: "mid" },
    { title: "Wyjaśnij async/await w C#.", answer: "async oznacza metodę zawierającą await. await wstrzymuje wykonanie aż Task się zakończy, zwalniając wątek. Kompilator generuje state machine. ConfigureAwait(false) pomija synchronizację kontekstu. Nigdy nie blokuj .Result/.Wait() — ryzyko deadlocka.", difficulty: "mid" },
    { title: "Czym jest Dependency Injection w ASP.NET Core?", answer: "ASP.NET Core ma wbudowany DI container. Rejestracja w Program.cs: AddTransient (nowa instancja), AddScoped (per-request), AddSingleton (jedna). Wstrzykiwanie przez konstruktor. IServiceCollection konfiguruje, IServiceProvider rozwiązuje. Wspiera interfejsy i konkretne typy.", difficulty: "mid" },
    { title: "Co to jest garbage collector w .NET?", answer: "GC .NET używa generacji: Gen0 (krótkotrwałe), Gen1 (bufor), Gen2 (długotrwałe). Kolekcja Gen0 najczęstsza i najszybsza. Large Object Heap (LOH) dla obiektów >85KB. Workstation vs Server GC. IDisposable i using dla zasobów niezarządzanych.", difficulty: "mid" },
    { title: "Wyjaśnij middleware pipeline w ASP.NET Core.", answer: "Middleware to komponenty tworzące pipeline przetwarzania HTTP. Każdy może wykonać logikę przed i po next(). Kolejność w Program.cs ma znaczenie: Exception → HTTPS Redirect → Static Files → Routing → Auth → Endpoints. UseMiddleware<T>() lub Use().", difficulty: "mid" },
    { title: "Czym są delegates i events w C#?", answer: "Delegate to type-safe wskaźnik na metodę. Action<T> (void), Func<T,TResult> (z wynikiem). Event to delegate z ograniczonym dostępem — tylko właściciel może wywoływać. event keyword zapobiega przypisaniu z zewnątrz. Publisher-subscriber pattern.", difficulty: "junior" },
    { title: "Co to jest pattern matching w C# 8+?", answer: "Pattern matching rozszerzony w C# 8+: switch expressions, property patterns ({ Name: \"Jan\" }), tuple patterns, positional patterns. C# 9: relational (<, >), logical (and, or, not). C# 11: list patterns ([1, .., 5]). Potężny mechanizm dekompozycji danych.", difficulty: "senior" },
  ],
  docker: [
    { title: "Czym jest Docker i czym różni się od maszyn wirtualnych?", answer: "Docker to platforma konteneryzacji — izoluje aplikację z jej zależnościami. Kontenery dzielą kernel hosta (lekkie, sekundy startu). VM ma pełny OS (ciężkie, minuty startu). Docker: mniej zasobów, szybsze, ale słabsza izolacja niż VM.", difficulty: "junior" },
    { title: "Wyjaśnij wieloetapowy build (multi-stage) w Dockerfile.", answer: "Multi-stage build używa wielu FROM w jednym Dockerfile. Etap budowania (z SDK, tools) produkuje artefakt, etap końcowy kopiuje tylko wynik (COPY --from). Drastycznie zmniejsza rozmiar obrazu — np. Go app z 1GB na 10MB. Bezpieczeństwo: brak narzędzi dev w produkcji.", difficulty: "mid" },
    { title: "Jak działa networking w Docker?", answer: "Docker ma sterowniki sieci: bridge (domyślny, izolowana sieć), host (sieć hosta), overlay (między hostami, Swarm), none. Kontenery w tej samej sieci komunikują się po nazwie. -p mapuje porty. Docker Compose tworzy dedykowaną sieć per projekt.", difficulty: "mid" },
    { title: "Czym jest Docker Compose i do czego służy?", answer: "Docker Compose definiuje wielokontenerowe aplikacje w docker-compose.yml. Deklaratywnie opisuje serwisy, sieci, wolumeny. docker compose up uruchamia cały stos. Idealne do lokalnego dev i testowania. V2 wbudowane w Docker CLI.", difficulty: "junior" },
    { title: "Jak zarządzać danymi w Docker?", answer: "Trzy opcje: volumes (zarządzane przez Docker, rekomendowane), bind mounts (mapowanie katalogu hosta), tmpfs (w pamięci). Volumes przetrwają restart kontenera. Named volumes do baz danych. docker volume create/ls/rm do zarządzania.", difficulty: "mid" },
    { title: "Jakie są best practices tworzenia Dockerfile?", answer: "Mały bazowy obraz (alpine, distroless). Łączenie RUN (mniej warstw). .dockerignore dla node_modules, .git. COPY przed RUN dla cache warstw. Non-root user. Multi-stage build. Pinowanie wersji. Skanowanie podatności (docker scout).", difficulty: "mid" },
    { title: "Czym jest container orchestration?", answer: "Orkiestracja automatyzuje deploy, skalowanie i zarządzanie kontenerami w klastrze. Docker Swarm: prosty, wbudowany. Kubernetes: standard branżowy, bardziej złożony. Funkcje: service discovery, load balancing, rolling updates, self-healing, secrets management.", difficulty: "senior" },
  ],
  kubernetes: [
    { title: "Czym jest Kubernetes i jakie problemy rozwiązuje?", answer: "Kubernetes (K8s) to platforma orkiestracji kontenerów. Automatyzuje deployment, skalowanie i zarządzanie konteneryzowanymi aplikacjami. Rozwiązuje: service discovery, load balancing, rolling updates, self-healing, storage orchestration, secrets/config management.", difficulty: "junior" },
    { title: "Wyjaśnij różnicę między Pod, Deployment i Service.", answer: "Pod: najmniejsza jednostka — jeden lub więcej kontenerów dzielących sieć i storage. Deployment: zarządza replikami Podów, rolling updates, rollback. Service: stabilny endpoint (ClusterIP/NodePort/LoadBalancer) dla grupy Podów, load balancing, DNS.", difficulty: "mid" },
    { title: "Jak działa Ingress w Kubernetes?", answer: "Ingress definiuje reguły HTTP/HTTPS routingu do serwisów — host-based, path-based. Ingress Controller (nginx, traefik) implementuje reguły. TLS termination z Secret. Annotacje konfigurują specyficzne zachowania. Alternatywa: Gateway API (nowszy standard).", difficulty: "mid" },
    { title: "Czym jest ConfigMap i Secret?", answer: "ConfigMap przechowuje konfigurację jako key-value. Secret przechowuje wrażliwe dane (base64, nie szyfrowane domyślnie!). Montowane jako pliki lub zmienne środowiskowe. Encryption at rest wymaga konfiguracji. Zewnętrzne secret managery: Vault, AWS Secrets Manager.", difficulty: "mid" },
    { title: "Wyjaśnij liveness, readiness i startup probes.", answer: "Liveness: czy kontener żyje — restart jeśli fail. Readiness: czy gotowy na ruch — usunięcie z Service jeśli fail. Startup: czy się uruchomił — dla wolno startujących aplikacji. HTTP GET, TCP socket lub exec command. Konfiguracja: initialDelay, period, threshold.", difficulty: "mid" },
    { title: "Jak działa Horizontal Pod Autoscaler?", answer: "HPA automatycznie skaluje liczbę replik na podstawie metryk. Domyślnie CPU/Memory (Metrics Server). Custom metrics przez Prometheus adapter. Algorytm: desiredReplicas = ceil(currentReplicas * (currentMetric / targetMetric)). Min/max replicas. Cooldown periods.", difficulty: "senior" },
    { title: "Czym jest StatefulSet i kiedy go używać?", answer: "StatefulSet zarządza stateful aplikacjami: stabilne nazwy (pod-0, pod-1), trwały storage (PVC per pod), ordered deployment/scaling. Używany dla baz danych, Kafka, ZooKeeper. W odróżnieniu od Deployment — pody nie są wymienne.", difficulty: "senior" },
  ],
  aws: [
    { title: "Czym jest VPC i jak skonfigurować sieć w AWS?", answer: "VPC (Virtual Private Cloud) to izolowana sieć w AWS. Subnety: publiczne (z Internet Gateway) i prywatne (z NAT Gateway). Security Groups (stateful firewall per instancja) i NACLs (stateless per subnet). Routing tables kierują ruch.", difficulty: "mid" },
    { title: "Jaka jest różnica między EC2, ECS, Lambda i Fargate?", answer: "EC2: pełne serwery wirtualne, kontrola nad OS. ECS: orkiestracja kontenerów na EC2. Fargate: serverless containers — brak zarządzania serwerami. Lambda: serverless functions, per-invocation billing, 15min limit. Od monolitu: EC2 → ECS → Fargate → Lambda.", difficulty: "mid" },
    { title: "Wyjaśnij S3 storage classes.", answer: "S3 Standard: częsty dostęp, niska latencja. Infrequent Access (IA): rzadziej, tańszy storage, opłata za dostęp. Glacier: archiwum, minuty-godziny retrieval. Glacier Deep Archive: najtańszy, 12h retrieval. Intelligent-Tiering: automatyczne przenoszenie. Lifecycle rules automatyzują przejścia.", difficulty: "mid" },
    { title: "Czym jest IAM i jak zarządzać uprawnieniami?", answer: "IAM zarządza tożsamościami i dostępem. Users, Groups, Roles, Policies. Policy: JSON z Effect/Action/Resource. Principle of least privilege. Roles dla serwisów (EC2 role) i cross-account. MFA obowiązkowe. AWS Organizations dla wielu kont.", difficulty: "junior" },
    { title: "Jak działa Auto Scaling w AWS?", answer: "Auto Scaling Group (ASG) automatycznie dodaje/usuwa instancje EC2. Launch Template definiuje konfigurację. Scaling policies: target tracking (utrzymuj CPU 70%), step scaling, scheduled. Health checks zastępują unhealthy instancje. Integracja z ALB.", difficulty: "mid" },
    { title: "Wyjaśnij różnicę między SQS, SNS i EventBridge.", answer: "SQS: kolejka wiadomości, pull, point-to-point, dead letter queue. SNS: pub/sub, push do wielu subskrybentów (SQS, Lambda, email). EventBridge: event bus z filtrowaniem reguł, integracje z SaaS, schema registry. Często łączone: SNS → SQS fanout.", difficulty: "mid" },
    { title: "Czym jest CloudFormation / CDK?", answer: "CloudFormation: Infrastructure as Code — YAML/JSON templates definiujące zasoby AWS. Stack zarządza cyklem życia. Change sets do preview. CDK: CloudFormation w kodzie (TypeScript, Python). L1/L2/L3 konstrukty. cdk synth generuje template. Drift detection wykrywa ręczne zmiany.", difficulty: "senior" },
    { title: "Jak zaprojektować wysoką dostępność na AWS?", answer: "Multi-AZ: RDS, ElastiCache automatycznie. ALB rozdziela ruch. Auto Scaling utrzymuje pojemność. S3 ma 11x9 durability. Route53 health checks i failover. Multi-region: Route53 latency routing, S3 cross-region replication, Aurora Global Database.", difficulty: "senior" },
  ],
  angular: [
    { title: "Czym jest Angular i jak różni się od AngularJS?", answer: "Angular to kompletny framework SPA od Google, przepisany od zera (v2+). TypeScript zamiast JS, komponentowa architektura (vs MVC), moduły, CLI, RxJS. AngularJS (1.x) to starszy framework z two-way binding i scope. Brak kompatybilności wstecznej.", difficulty: "junior" },
    { title: "Wyjaśnij dependency injection w Angular.", answer: "Angular ma hierarchiczny DI container. Serwisy dekorowane @Injectable(), rejestrowane w providedIn: 'root' (singleton) lub w module/komponencie. Injector tree: root → module → component. useClass, useValue, useFactory do konfiguracji providerów.", difficulty: "mid" },
    { title: "Czym jest Change Detection w Angular?", answer: "Change Detection sprawdza czy dane się zmieniły i aktualizuje DOM. Domyślnie: sprawdza całe drzewo po każdym evencie. OnPush: sprawdza tylko gdy Input ref się zmieni lub event w komponencie. Signals (Angular 16+): granularna reaktywność bez Zone.js.", difficulty: "mid" },
    { title: "Jak działają Observables i RxJS w Angular?", answer: "Observable to strumień asynchronicznych wartości. Angular używa RxJS: HttpClient zwraca Observable, Router events, FormControl.valueChanges. Operatory: map, filter, switchMap, mergeMap. AsyncPipe subskrybuje w template. Pamiętaj o unsubscribe (takeUntil, DestroyRef).", difficulty: "mid" },
    { title: "Czym jest lazy loading modułów?", answer: "Lazy loading ładuje moduły na żądanie przy nawigacji. Konfiguracja w routerze: loadChildren: () => import('./feature/feature.module'). Zmniejsza initial bundle. Standalone components (Angular 14+): loadComponent zamiast modułów. Preloading strategies optymalizują UX.", difficulty: "mid" },
    { title: "Wyjaśnij Angular Signals.", answer: "Signals (Angular 16+) to reaktywne prymitywy: signal() (wartość), computed() (derywowane), effect() (side effect). Granularna reaktywność bez Zone.js. Prostsze niż RxJS dla synchronicznego stanu. Przyszłość Angular — stopniowe zastępowanie Zone.js-based change detection.", difficulty: "senior" },
    { title: "Czym jest standalone component?", answer: "Standalone component (Angular 14+) nie wymaga NgModule. standalone: true w dekoratorze, imports bezpośrednio w komponencie. Upraszcza architekturę, ułatwia tree-shaking. Nowy domyślny sposób tworzenia komponentów od Angular 17+.", difficulty: "junior" },
  ],
  vuejs: [
    { title: "Czym jest reaktywność w Vue.js?", answer: "Vue.js automatycznie śledzi zależności i aktualizuje DOM gdy dane się zmieniają. Vue 2: Object.defineProperty (getter/setter). Vue 3: Proxy (lepsze — wykrywa dodawanie/usuwanie właściwości). ref() dla prymitywów, reactive() dla obiektów w Composition API.", difficulty: "junior" },
    { title: "Jaka jest różnica między Options API a Composition API?", answer: "Options API: organizacja po typie (data, methods, computed). Composition API (Vue 3): organizacja po logice, setup() lub <script setup>. Composition: lepszy reuse (composables), TypeScript support, tree-shaking. Options prostsze dla początkujących.", difficulty: "mid" },
    { title: "Wyjaśnij cykl życia komponentu Vue.", answer: "Hooki: beforeCreate/created → beforeMount/mounted → beforeUpdate/updated → beforeUnmount/unmounted. W Composition API: onMounted, onUpdated, onUnmounted. mounted: DOM dostępny. unmounted: cleanup (timers, event listeners). setup() odpowiada beforeCreate/created.", difficulty: "mid" },
    { title: "Czym jest Pinia i jak zastępuje Vuex?", answer: "Pinia to oficjalny state manager Vue 3. Store: state, getters, actions (brak mutations!). Pełne TypeScript support, devtools. Modularny design — każdy store jest niezależny. defineStore() z Options lub Setup syntax. Prostszy, lżejszy i bardziej intuicyjny niż Vuex.", difficulty: "mid" },
    { title: "Jak działa v-model i two-way binding?", answer: "v-model to syntactic sugar: :modelValue + @update:modelValue (Vue 3) lub :value + @input (Vue 2). Na inputach wiąże wartość i nasłuchuje zmian. Modyfikatory: .lazy (change event), .number, .trim. Wiele v-model na komponencie (Vue 3).", difficulty: "junior" },
    { title: "Czym są composables w Vue 3?", answer: "Composables to funkcje enkapsulujące reaktywną logikę z Composition API. Konwencja: useXxx(). Przykład: useMousePosition() zwraca reactive x, y. Odpowiednik React hooks ale bez ograniczeń kolejności. Reuse logiki między komponentami bez mixinów.", difficulty: "mid" },
    { title: "Wyjaśnij różnicę między computed a watch.", answer: "computed: wartość wynikowa z reaktywnych zależności, cache'owana, synchroniczna. watch: reakcja na zmiany wartości, side effects, async. watchEffect: automatyczne śledzenie zależności. computed do transformacji danych, watch do efektów ubocznych (API calls).", difficulty: "junior" },
  ],
  swift: [
    { title: "Czym są Optionals w Swift?", answer: "Optional to typ, który może zawierać wartość lub nil. Deklaracja: String?. Unwrapping: if let (optional binding), guard let (early return), ! (force unwrap — crash jeśli nil). Optional chaining: value?.property. Nil coalescing: value ?? default.", difficulty: "junior" },
    { title: "Wyjaśnij różnicę między struct a class w Swift.", answer: "Struct: value type (kopiowanie), stack, brak dziedziczenia, mutating methods. Class: reference type (referencja), heap, dziedziczenie, deinitializery. Swift preferuje struct — String, Array, Dictionary to struktury. Class gdy potrzeba identity, dziedziczenia lub ARC.", difficulty: "mid" },
    { title: "Jak działa ARC (Automatic Reference Counting)?", answer: "ARC śledzi liczbę silnych referencji do obiektu. Gdy spadnie do 0, obiekt jest zwalniany. Strong reference cycle: dwa obiekty wzajemnie się trzymają. Rozwiązanie: weak (nil gdy obiekt zniknie) lub unowned (crash gdy obiekt zniknie). weak dla opcjonalnych, unowned dla gwarantowanych.", difficulty: "mid" },
    { title: "Czym są protokoły w Swift?", answer: "Protokół definiuje zestaw wymagań (metody, properties). Typy adoptują protokół implementując wymagania. Protocol-Oriented Programming preferowany nad OOP. Extension protokołu dodaje domyślne implementacje. Protokoły z associated types to generyczne interfejsy.", difficulty: "mid" },
    { title: "Wyjaśnij async/await i structured concurrency w Swift.", answer: "async/await (Swift 5.5): asynchroniczny kod wyglądający synchronicznie. Task: jednostka pracy asynchronicznej. TaskGroup: structured concurrency — dzieci kończą się z rodzicem. Actor: izolacja stanu w kontekście współbieżnym. Sendable zapewnia thread safety.", difficulty: "senior" },
    { title: "Czym jest SwiftUI i jak różni się od UIKit?", answer: "SwiftUI: deklaratywny framework UI. Widoki to struktury z body. State management: @State, @Binding, @Observable. Automatyczne aktualizacje przy zmianie danych. UIKit: imperatywny, UIViewController, delegates/datasources. SwiftUI prostszy, UIKit dojrzalszy.", difficulty: "mid" },
  ],
  kotlin: [
    { title: "Czym jest null safety w Kotlin?", answer: "Kotlin rozróżnia typy nullable (String?) i non-nullable (String). Kompilator wymusza sprawdzenie null. Operatory: ?. (safe call), ?: (Elvis), !! (force unwrap). let z ?. do bezpiecznego wykonania. Eliminuje NullPointerException na etapie kompilacji.", difficulty: "junior" },
    { title: "Wyjaśnij coroutines w Kotlin.", answer: "Coroutines to lekkie wątki zarządzane przez Kotlin runtime. launch (fire-and-forget) i async (zwraca Deferred). CoroutineScope zarządza cyklem życia. Dispatchers: Main (UI), IO (sieć/dysk), Default (CPU). suspend functions oznaczają punkty zawieszenia.", difficulty: "mid" },
    { title: "Jaka jest różnica między data class a zwykłą klasą?", answer: "Data class automatycznie generuje: equals(), hashCode(), toString(), copy(), componentN() (destructuring). Wymaga min jednego parametru w primary constructor. Służy do przechowywania danych (DTO, modele). val/var parametry tworzą properties.", difficulty: "junior" },
    { title: "Czym są sealed class i sealed interface?", answer: "Sealed class/interface ogranicza hierarchię do tego samego pakietu (Kotlin 1.5+). Kompilator wie o wszystkich podtypach — when expression jest wyczerpujące bez else. Idealne do modelowania skończonych stanów: Result, UI State. Podobne do enum ale z danymi.", difficulty: "mid" },
    { title: "Wyjaśnij extension functions.", answer: "Extension functions dodają metody do istniejących typów bez modyfikacji: fun String.isPalindrome(): Boolean. Rozwiązywane statycznie (nie nadpisują metod klasy). Używane w stdlib (let, also, apply, run, with). Poprawiają czytelność i organizację kodu.", difficulty: "mid" },
    { title: "Czym jest Flow w Kotlin?", answer: "Flow to cold asynchroniczny strumień danych (typ w kotlin.coroutines). emit() wysyła wartości, collect() odbiera. Operatory: map, filter, flatMapConcat. StateFlow i SharedFlow do hot streams. flowOn zmienia dispatcher. Lżejsza alternatywa dla RxJava.", difficulty: "senior" },
    { title: "Jak działa delegacja w Kotlin?", answer: "Class delegation: class Adapter(list: List<Int>) : List<Int> by list — automatyczna delegacja interfejsu. Property delegation: by lazy (leniwa inicjalizacja), by observable (obserwacja zmian), by map. operator getValue/setValue do custom delegates.", difficulty: "mid" },
  ],
  ruby: [
    { title: "Czym jest blok, proc i lambda w Ruby?", answer: "Block: anonimowy fragment kodu przekazywany do metody (do...end lub {}). Proc: blok jako obiekt (Proc.new), nie sprawdza arności. Lambda: proc sprawdzający arność, return wraca z lambda (nie z metody). yield wywołuje blok.", difficulty: "mid" },
    { title: "Wyjaśnij konwencję MVC w Ruby on Rails.", answer: "Model: logika biznesowa i ORM (ActiveRecord). View: szablony (ERB/Haml). Controller: obsługuje żądania, łączy model i widok. Routes mapują URL na kontrolery. Convention over Configuration: nazwy plików, tabel, kolumn mają ustaloną konwencję.", difficulty: "junior" },
    { title: "Czym jest ActiveRecord w Rails?", answer: "ActiveRecord to ORM — mapuje klasy na tabele, obiekty na wiersze. Konwencje: User → tabela users. Migracje zarządzają schematem. Associations: has_many, belongs_to, has_and_belongs_to_many. Validations, callbacks, scopes. Query interface: where, joins, includes.", difficulty: "mid" },
    { title: "Jak działa metaprogramowanie w Ruby?", answer: "Ruby pozwala modyfikować klasy/obiekty w runtime. define_method tworzy metody dynamicznie. method_missing przechwytuje nieistniejące metody. class_eval/instance_eval wykonują kod w kontekście klasy/instancji. ActiveRecord używa metaprogramowania intensywnie.", difficulty: "senior" },
    { title: "Czym są Gems i Bundler?", answer: "Gem to pakiet Ruby (biblioteka, framework). RubyGems.org to główne repozytorium. Bundler zarządza zależnościami projektu: Gemfile deklaruje gems, bundle install pobiera, Gemfile.lock zapewnia determinizm. bundle exec uruchamia z poprawnymi wersjami.", difficulty: "junior" },
    { title: "Wyjaśnij symbol w Ruby.", answer: "Symbol (:name) to niemutowalny identyfikator. W przeciwieństwie do String, ten sam symbol to ten sam obiekt w pamięci. Szybsze porównanie. Używane jako klucze hash, nazwy metod, argumenty. Konwersja: :name.to_s / 'name'.to_sym.", difficulty: "junior" },
  ],
  mongodb: [
    { title: "Czym jest MongoDB i czym różni się od baz relacyjnych?", answer: "MongoDB to dokumentowa baza NoSQL. Dane w dokumentach BSON (JSON-like), nie w tabelach. Elastyczny schemat — dokumenty mogą mieć różne pola. Denormalizacja zamiast JOINów. Skalowanie horyzontalne (sharding). Dobre dla danych semi-strukturalnych i szybkiego prototypowania.", difficulty: "junior" },
    { title: "Wyjaśnij indeksy w MongoDB.", answer: "Indeksy przyspieszają zapytania (B-tree). Typy: single field, compound (wiele pól, kolejność ważna), multikey (tablice), text (pełnotekstowy), geospatial (2dsphere). createIndex(), explain() do analizy. Indeksy zużywają RAM — zbyt wiele spowalnia zapisy.", difficulty: "mid" },
    { title: "Jak działa aggregation pipeline?", answer: "Pipeline przetwarza dokumenty etapami: $match (filtrowanie), $group (agregacja), $project (kształtowanie), $sort, $lookup (JOIN), $unwind (rozwijanie tablic). Etapy sekwencyjne — output jednego to input następnego. Wydajniejsze niż map-reduce.", difficulty: "mid" },
    { title: "Czym jest sharding w MongoDB?", answer: "Sharding dzieli dane między wiele serwerów (shards). Shard key określa podział. Strategie: hashed (równomierny rozkład) lub ranged (zapytania zakresowe). mongos routuje zapytania. Config servers przechowują metadane. Ważne: dobry shard key to klucz do wydajności.", difficulty: "senior" },
    { title: "Jak działa replikacja w MongoDB?", answer: "Replica Set: primary (zapisy) + secondaries (kopie). Automatic failover: jeśli primary padnie, election wybiera nowy. Odczyty z secondaries (opcjonalnie). Oplog loguje operacje. WriteConcern kontroluje potwierdzenie (w:1 vs w:majority). ReadPreference kieruje odczyty.", difficulty: "mid" },
    { title: "Czym jest schema validation w MongoDB?", answer: "Schema validation wymusza strukturę dokumentów przez JSON Schema. Definicja: db.createCollection z validator. Poziomy: strict (blokuje) lub moderate (istniejące dokumenty ignorowane). Validacja na insert/update. Balans między elastycznością NoSQL a integralnością danych.", difficulty: "mid" },
  ],
  graphql: [
    { title: "Czym jest GraphQL i jak różni się od REST?", answer: "GraphQL to język zapytań do API — klient określa dokładnie jakie dane potrzebuje. Jeden endpoint vs wiele w REST. Eliminuje over/under-fetching. Schema definiuje typy i operacje. REST prostszy, GraphQL elastyczniejszy dla złożonych relacji.", difficulty: "junior" },
    { title: "Wyjaśnij Query, Mutation i Subscription.", answer: "Query: odczyt danych (odpowiednik GET). Mutation: modyfikacja danych (POST/PUT/DELETE). Subscription: real-time dane przez WebSocket. Schema definiuje dostępne operacje. Resolvers implementują logikę. Każde pole ma resolver (domyślny lub custom).", difficulty: "junior" },
    { title: "Czym jest N+1 problem w GraphQL i jak go rozwiązać?", answer: "N+1: zapytanie o listę (1 query) + zapytanie per element (N queries). Rozwiązanie: DataLoader — zbiera klucze i wykonuje batch request. DataLoader per-request. Także: JOIN w SQL, eager loading w ORM, @defer/@stream dla dużych odpowiedzi.", difficulty: "mid" },
    { title: "Jak działa schema i type system w GraphQL?", answer: "Schema definiuje typy (type, input, enum, interface, union), operacje (Query, Mutation, Subscription). SDL (Schema Definition Language): type User { id: ID!, name: String! }. Nullability: ! oznacza non-null. Introspection pozwala klientom odkrywać schema.", difficulty: "mid" },
    { title: "Wyjaśnij resolvers i kontekst.", answer: "Resolver to funkcja (parent, args, context, info) implementująca logikę pola. Resolver chain: parent resolver przekazuje wynik do child resolverów. Context: współdzielone dane per-request (user, DB connection, DataLoader). Default resolver: parent[fieldName].", difficulty: "mid" },
    { title: "Czym jest fragment i jak go używać?", answer: "Fragment to reużywalny zestaw pól: fragment UserFields on User { id, name, email }. Używany w zapytaniu: ...UserFields. Redukuje duplikację. Inline fragments dla union/interface: ... on Dog { breed }. Warunek @include(if:) i @skip(if:) do warunkowych pól.", difficulty: "junior" },
  ],
  linux: [
    { title: "Czym jest proces i wątek w Linux?", answer: "Proces: instancja programu z własną przestrzenią adresową, PID, deskryptorami plików. Wątek: lekka jednostka wykonania w procesie, dzieli pamięć. fork() tworzy proces, pthread_create wątek. ps, top do monitorowania. Sygnały (SIGTERM, SIGKILL) do komunikacji.", difficulty: "junior" },
    { title: "Wyjaśnij uprawnienia plików w Linux.", answer: "Trzy grupy: owner, group, others. Trzy uprawnienia: read (4), write (2), execute (1). chmod 755: rwxr-xr-x. chown zmienia właściciela. SUID/SGID: wykonanie z uprawnieniami właściciela/grupy. Sticky bit: tylko właściciel może usunąć w /tmp.", difficulty: "junior" },
    { title: "Jak działa systemd?", answer: "systemd to init system i manager serwisów w nowoczesnym Linux. Unit files (.service, .timer, .socket) definiują serwisy. systemctl start/stop/enable/status zarządza. journalctl do logów. Paralelny start, dependency management, socket activation. PID 1.", difficulty: "mid" },
    { title: "Czym jest pipe i redirect w Linux?", answer: "Pipe (|) łączy stdout jednego procesu ze stdin następnego: ls | grep txt. Redirect: > (nadpisz stdout), >> (dołącz), < (stdin), 2> (stderr), &> (oba). /dev/null pochłania output. Tee zapisuje do pliku i wyświetla.", difficulty: "junior" },
    { title: "Wyjaśnij jak działa pamięć wirtualna.", answer: "Każdy proces ma własną przestrzenią adresową (wirtualną). MMU tłumaczy adresy wirtualne na fizyczne przez tablicę stron. Swap: nieużywane strony na dysk. Page fault ładuje stronę z dysku. Overcommit: Linux obiecuje więcej pamięci niż ma (OOM killer).", difficulty: "senior" },
    { title: "Czym jest iptables/nftables?", answer: "iptables to firewall w Linux — filtruje pakiety na podstawie reguł. Tabele: filter, nat, mangle. Łańcuchy: INPUT, OUTPUT, FORWARD. Reguły: -A (add), -j (target: ACCEPT/DROP/REJECT). nftables to nowszy zamiennik z lepszą składnią. ufw jako frontend.", difficulty: "mid" },
    { title: "Jak działa cron i at?", answer: "cron wykonuje zadania cyklicznie. crontab -e edytuje. Format: minuta godzina dzień miesiąc dzień_tygodnia polecenie. cron.daily/weekly/monthly w /etc. at wykonuje jednorazowo o zadanym czasie. systemd timers to nowoczesna alternatywa.", difficulty: "junior" },
  ],
  git: [
    { title: "Jaka jest różnica między merge a rebase?", answer: "Merge tworzy commit łączący dwie gałęzie — zachowuje historię, ale tworzy dodatkowe commity. Rebase przenosi commity na szczyt innej gałęzi — liniowa historia, ale przepisuje commity. Rebase dla feature branches, merge/squash do main.", difficulty: "mid" },
    { title: "Czym jest staging area (index)?", answer: "Staging area to pośredni krok między working directory a repozytorium. git add dodaje zmiany do index. git commit zapisuje index jako commit. Pozwala na selektywne commity — część zmian do commita, reszta czeka. git diff --staged pokazuje staged zmiany.", difficulty: "junior" },
    { title: "Jak cofnąć zmiany w Git?", answer: "Working dir: git checkout -- plik (stare) lub git restore plik. Staged: git reset HEAD plik lub git restore --staged. Ostatni commit: git commit --amend. Opublikowany commit: git revert (nowy commit cofający). git reset --hard: niebezpieczne — traci zmiany.", difficulty: "mid" },
    { title: "Wyjaśnij git cherry-pick.", answer: "Cherry-pick aplikuje konkretny commit z innej gałęzi: git cherry-pick <hash>. Tworzy nowy commit z tymi samymi zmianami ale innym hashem. Używane do przenoszenia hotfixów, backportowania. Opcja -n aplikuje zmiany bez commita.", difficulty: "mid" },
    { title: "Czym jest git stash?", answer: "Stash tymczasowo zapisuje niezacommitowane zmiany: git stash. Przydatne przy zmianie brancha. git stash pop przywraca i usuwa. git stash list pokazuje listę. git stash apply przywraca bez usuwania. stash@{0} to najnowszy.", difficulty: "junior" },
    { title: "Jak działa git bisect?", answer: "Bisect znajduje commit wprowadzający bug przez binary search. git bisect start, git bisect bad (obecny), git bisect good <hash>. Git checkout'uje środkowy commit, ty testujesz i oznaczasz good/bad. O(log n) zamiast O(n). git bisect run automatyzuje.", difficulty: "senior" },
    { title: "Wyjaśnij strategię gitflow vs trunk-based development.", answer: "Gitflow: gałęzie develop, feature, release, hotfix. Długotrwałe feature branches. Trunk-based: krótkie feature branches (max 1-2 dni), częste merge do main. Feature flags zamiast branchy. Trunk-based lepsze dla CI/CD i szybkich deployów.", difficulty: "mid" },
  ],
  "html-css": [
    { title: "Czym jest Box Model w CSS?", answer: "Każdy element HTML to box: content → padding → border → margin. box-sizing: content-box (domyślny, width = content) vs border-box (width = content + padding + border). border-box zalecany — prostsze obliczenia, * { box-sizing: border-box }.", difficulty: "junior" },
    { title: "Wyjaśnij Flexbox i jego główne właściwości.", answer: "Flexbox to jednowymiarowy layout. Container: display: flex, flex-direction (row/column), justify-content (main axis), align-items (cross axis), gap. Items: flex-grow, flex-shrink, flex-basis, align-self, order. Idealny do nawigacji, kart, centrowania.", difficulty: "junior" },
    { title: "Czym jest CSS Grid i kiedy go używać?", answer: "CSS Grid to dwuwymiarowy layout. grid-template-columns/rows definiują siatkę. fr (fraction), repeat(), minmax(). grid-area do pozycjonowania. Auto-fit/auto-fill z minmax do responsywnych gridów. Grid dla layoutów 2D, Flexbox dla 1D.", difficulty: "mid" },
    { title: "Jaka jest różnica między position: relative, absolute, fixed, sticky?", answer: "relative: przesunięty względem siebie, zajmuje miejsce. absolute: względem najbliższego positioned przodka, wyjęty z flow. fixed: względem viewport, nie scrolluje. sticky: relative do przekroczenia progu (top: 0), potem fixed w kontenerze.", difficulty: "junior" },
    { title: "Wyjaśnij specificity (specyficzność) w CSS.", answer: "Specyficzność określa priorytet selektorów: inline (1000) > ID (100) > class/attribute/pseudo-class (10) > element/pseudo-element (1). !important nadpisuje wszystko. Przy równej specyficzności wygrywa późniejsza reguła. BEM i utility classes minimalizują problemy.", difficulty: "mid" },
    { title: "Czym są media queries i responsive design?", answer: "Media queries stosują style warunkowe: @media (min-width: 768px) {}. Mobile-first: domyślne style dla mobile, min-width dla większych. Breakpoints: 640/768/1024/1280px (Tailwind). Container queries (CSS Containment) — nowy standard relatywny do kontenera.", difficulty: "mid" },
    { title: "Wyjaśnij semantic HTML.", answer: "Semantic HTML to używanie elementów wg znaczenia: header, nav, main, article, section, aside, footer. Poprawia SEO, dostępność (screen readers), czytelność kodu. div/span to elementy ogólne, bez semantyki. Headings (h1-h6) w hierarchicznej kolejności.", difficulty: "junior" },
    { title: "Jak działają CSS Custom Properties (zmienne)?", answer: "Deklaracja: --color-primary: #6366f1. Użycie: var(--color-primary, fallback). Kaskadowe — dziedziczone, scope per selector. :root dla globalnych. Dynamiczne — zmieniane w JS (style.setProperty). Lepsze od preprocessor variables — działają w runtime, media queries.", difficulty: "mid" },
  ],
  nextjs: [
    { title: "Czym jest Next.js i jakie problemy rozwiązuje?", answer: "Next.js to React framework z SSR, SSG, ISR, API routes. Rozwiązuje: SEO (server rendering), routing (file-based), code splitting (automatyczne), image optimization. App Router (13+) wprowadza Server Components, layouts, streaming.", difficulty: "junior" },
    { title: "Wyjaśnij różnicę między SSR, SSG, ISR i CSR.", answer: "SSR (getServerSideProps): renderowanie per-request na serwerze. SSG (getStaticProps): generowanie HTML w build time. ISR: SSG z rewalidacją (revalidate: 60). CSR: renderowanie w przeglądarce. App Router: domyślnie Server Components, dynamic/force-static do kontroli.", difficulty: "mid" },
    { title: "Jak działa App Router vs Pages Router?", answer: "Pages Router: pages/ directory, getServerSideProps/getStaticProps, _app.tsx. App Router: app/ directory, Server Components domyślne, layouts (layout.tsx), loading/error states, parallel routes, intercepting routes. App Router to przyszłość Next.js.", difficulty: "mid" },
    { title: "Czym są Server Actions w Next.js?", answer: "Server Actions to funkcje z 'use server' wywoływane z klientu jak RPC. Zastępują API routes dla mutacji. Automatyczna serializacja, rewalidacja cache. Formularze: action={serverAction}. useFormStatus, useFormState do UI. Progressive enhancement bez JS.", difficulty: "mid" },
    { title: "Jak działa caching w Next.js App Router?", answer: "Cztery warstwy: Request Memoization (deduplikacja fetch), Data Cache (persisted), Full Route Cache (statyczny HTML/RSC), Router Cache (klient). Kontrola: cache: 'no-store', revalidate, revalidatePath/Tag. Fetch cache agresywny domyślnie — wymaga świadomego zarządzania.", difficulty: "senior" },
    { title: "Czym jest middleware w Next.js?", answer: "middleware.ts w root projektu — wykonywany przed każdym żądaniem na edge. Użycia: auth redirect, geolocation, A/B testing, rewrite/redirect. NextResponse.next/redirect/rewrite. Matcher pattern ogranicza ścieżki. Lekki — bez Node.js API (edge runtime).", difficulty: "mid" },
    { title: "Wyjaśnij Image optimization w Next.js.", answer: "next/image automatycznie: lazy loading, responsive sizes, format (WebP/AVIF), resize na serwerze. Props: width, height (lub fill), sizes, priority (LCP). Remote images wymagają konfiguracji domains. Placeholder: blur z blurDataURL. Znacząco poprawia Core Web Vitals.", difficulty: "junior" },
  ],
  redis: [
    { title: "Czym jest Redis i do czego służy?", answer: "Redis to in-memory key-value store z opcjonalnym persistence. Struktury: strings, hashes, lists, sets, sorted sets, streams. Use cases: cache, session store, rate limiting, pub/sub, leaderboards, queues. Jednowątkowy (operacje atomowe), sub-millisecond latency.", difficulty: "junior" },
    { title: "Wyjaśnij strategie persistence w Redis.", answer: "RDB: snapshot w interwałach — mały plik, szybki restart, możliwa utrata danych. AOF: log każdej operacji — większy plik, wolniejszy restart, mniejsza utrata. AOF + RDB razem zalecane. AOF rewrite kompaktuje log. Redis 7: Multi-part AOF.", difficulty: "mid" },
    { title: "Jak działa Redis Pub/Sub?", answer: "Pub/Sub to messaging: SUBSCRIBE channel, PUBLISH channel message. Subskrybenci otrzymują wiadomości w real-time. Fire-and-forget — brak gwarancji dostarczenia (offline subskrybenci tracą). Dla gwarantowanego dostarczenia: Redis Streams z consumer groups.", difficulty: "mid" },
    { title: "Czym jest Redis Cluster?", answer: "Redis Cluster to natywne rozwiązanie shardingu. 16384 hash slotów rozdzielonych między węzły. Automatyczne failover z replikami. Klient przekierowany MOVED/ASK. Ograniczenia: multi-key operacje tylko na tym samym slocie (hash tags {}).", difficulty: "senior" },
    { title: "Jak zaimplementować cache z Redis?", answer: "Wzorce: Cache-Aside (czytaj z cache, miss → DB → cache), Write-Through (zapis do cache i DB), Write-Behind (async zapis do DB). TTL (EXPIRE) do wygasania. Cache invalidation: per-key lub pub/sub. Eviction policies: LRU, LFU, volatile-lru.", difficulty: "mid" },
    { title: "Czym są Redis Streams?", answer: "Streams to log-like struktura: XADD dodaje, XREAD czyta. Consumer Groups: wielu konsumentów, podział pracy, ACK per wiadomość. Pending entries (niezaackowane). XRANGE do odczytu zakresu. Alternatywa Kafka dla mniejszej skali. Persistence i replikacja.", difficulty: "senior" },
  ],
  devops: [
    { title: "Czym jest CI/CD i jakie są kluczowe praktyki?", answer: "CI (Continuous Integration): częste merge do main, automatyczne testy i build. CD (Continuous Delivery): automatyczny deploy do staging. Continuous Deployment: automatyczny deploy do produkcji. Narzędzia: GitHub Actions, GitLab CI, Jenkins. Pipeline: build → test → deploy.", difficulty: "junior" },
    { title: "Wyjaśnij Infrastructure as Code (IaC).", answer: "IaC to zarządzanie infrastrukturą przez kod zamiast ręcznej konfiguracji. Terraform: deklaratywny, multi-cloud, state file. Ansible: proceduralny, konfiguracja serwerów. CloudFormation/CDK: AWS-specific. Korzyści: wersjonowanie, review, reprodukowalność, automatyzacja.", difficulty: "mid" },
    { title: "Czym jest monitoring i observability?", answer: "Trzy filary: Metrics (Prometheus/Grafana — liczbowe pomiary), Logs (ELK/Loki — zdarzenia tekstowe), Traces (Jaeger/Zipkin — ścieżka requestu). Alerting na metrykach. SLI/SLO/SLA definiują cele. Observability to zdolność do zrozumienia systemu z jego outputów.", difficulty: "mid" },
    { title: "Jak działa blue-green i canary deployment?", answer: "Blue-green: dwa identyczne środowiska — switch ruchu z blue na green. Instant rollback. Canary: stopniowe przesuwanie ruchu (1% → 10% → 100%) z monitoringiem. Rolling update: stopniowa wymiana instancji. Feature flags: kontrola na poziomie kodu.", difficulty: "mid" },
    { title: "Czym jest GitOps?", answer: "GitOps to praktyka DevOps gdzie Git jest single source of truth dla infrastruktury i deployów. Zmiany przez PR → merge → automatyczny sync. Narzędzia: ArgoCD, Flux (Kubernetes). Pull-based: operator porównuje desired state z actual. Audytowalność, rollback przez git revert.", difficulty: "mid" },
    { title: "Wyjaśnij 12-Factor App.", answer: "12 zasad aplikacji cloud-native: codebase (jedno repo), dependencies (jawne), config (env vars), backing services (zasoby), build-release-run (rozdzielone), processes (stateless), port binding, concurrency (skalowanie procesów), disposability (szybki start/stop), dev/prod parity, logs (stdout), admin processes.", difficulty: "senior" },
    { title: "Czym jest service mesh?", answer: "Service mesh to warstwa infrastruktury zarządzająca komunikacją między mikroserwisami. Sidecar proxy (Envoy) przy każdym serwisie. Istio/Linkerd: mTLS, load balancing, retry, circuit breaker, observability. Control plane zarządza konfiguracją. Eliminuje logikę sieciową z kodu aplikacji.", difficulty: "senior" },
  ],
};

async function seed() {
  console.log("Seeding technologies...");
  for (const tech of technologies) {
    const questionsForTech = questionsMap[tech.slug] ?? [];
    tech.question_count = questionsForTech.length;

    const { error } = await supabase
      .from("technologies")
      .upsert(tech, { onConflict: "slug" });
    if (error) console.error(`Tech ${tech.slug}:`, error.message);
  }

  const { data: techRows } = await supabase.from("technologies").select("id, slug");
  const slugToId: Record<string, string> = {};
  for (const t of techRows ?? []) {
    slugToId[t.slug] = t.id;
  }

  console.log("Seeding questions...");
  for (const tech of technologies) {
    const techId = slugToId[tech.slug];
    if (!techId) {
      console.error(`No ID for ${tech.slug}, skipping`);
      continue;
    }
    const questions = questionsMap[tech.slug] ?? [];
    for (const q of questions) {
      const slug = slugify(q.title);
      const row = {
        slug,
        title: q.title,
        answer: q.answer,
        difficulty: q.difficulty,
        technology_id: techId,
        technology_slug: tech.slug,
        technology_name: tech.name,
        interview_count: randomInt(1, 80),
        level: randomFrom(levels),
        status: "approved",
      };

      const { error } = await supabase
        .from("questions")
        .upsert(row, { onConflict: "slug" });
      if (error) console.error(`Q "${q.title.slice(0, 40)}...":`, error.message);
    }
    console.log(`  ${tech.name}: ${questions.length} questions`);
  }

  console.log("Done!");
}

seed().catch(console.error);
