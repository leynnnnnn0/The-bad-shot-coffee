import { Head, router } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import first from '../../../public/images/1.jpg';
import third from '../../../public/images/3.jpg';
import fourth from '../../../public/images/4.jpg';
import fifth from '../../../public/images/5.jpg';
import sixth from '../../../public/images/6.jpg';
import seventh from '../../../public/images/2.jpg';
import eight from '../../../public/images/8.jpg';
import CoffeeArt from '../../../public/images/coffee-art-2d.png';
import MainLogo from '../../../public/images/mainLogo.png';
import menu1 from '../../../public/images/menu1.jpg';
import menu2 from '../../../public/images/menu2.jpg';
import menu3 from '../../../public/images/menu3.jpg';
import menu4 from '../../../public/images/menu4.jpg';
import menu5 from '../../../public/images/menu5.jpg';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export default function Welcome() {
    const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>(
        'other',
    );
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/iPad|iPhone|iPod/.test(userAgent)) {
            setPlatform('ios');
        } else if (/android/i.test(userAgent)) {
            setPlatform('android');
        } else {
            setPlatform('other');
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleDownload = async () => {
        if (platform === 'ios') {
            toast.info(
                'To install: Tap the Share button (...), then "Add to Home Screen"',
                { duration: 6000 },
            );
        } else if (platform === 'android' && deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                toast.success('App installed successfully!');
            }
            setDeferredPrompt(null);
        } else if (platform === 'android' && !deferredPrompt) {
            toast.info(
                'App is already installed or available through your browser menu',
                { duration: 4000 },
            );
        } else {
            toast.info(
                'Use Chrome or Edge on your mobile device to install this app',
                { duration: 4000 },
            );
        }
    };

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />

                <title>
                    The Bad Shot Coffee — Loyalty Rewards Program | Bold Coffee, Strong Memories
                </title>
                <meta
                    name="title"
                    content="The Bad Shot Coffee Digital Loyalty Card — Bold Coffee Rewards Program"
                />
                <meta
                    name="description"
                    content="Join The Bad Shot Coffee loyalty program! Earn stamps with every purchase and unlock free drinks. Double espresso shots, specialty blends, croffles, and comfort food — all in a warm, modern café vibe. Scan, earn, and redeem rewards instantly."
                />
                <meta
                    name="keywords"
                    content="The Bad Shot Coffee loyalty card, bad shot coffee stamp card, bad shot coffee rewards, digital loyalty card, coffee stamp card, cafe loyalty program Philippines, bold coffee rewards, specialty coffee loyalty, croffle cafe rewards, Spanish coffee loyalty card, double espresso cafe, neighborhood cafe loyalty program, coffee stamp rewards, digital punch card cafe, QR code loyalty card"
                />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="The Bad Shot Coffee — Digital Loyalty Card" />
                <meta
                    property="og:description"
                    content="Strong coffee, stronger rewards. Collect stamps at The Bad Shot Coffee and unlock free drinks, specialty blends, and exclusive perks."
                />
                <meta property="og:locale" content="en_PH" />

                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="author" content="The Bad Shot Coffee" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CafeOrCoffeeShop',
                        name: 'The Bad Shot Coffee',
                        description:
                            'Your go-to neighborhood café serving strong, flavorful coffee crafted with double espresso shots. Known for signature blends, creative specialty drinks, croffles, sandwiches, and rice meals. Join our digital loyalty program and earn stamps with every purchase.',
                        servesCuisine: ['Coffee', 'Specialty Drinks', 'Comfort Food'],
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Loyalty Rewards Program',
                            itemListElement: [
                                {
                                    '@type': 'Offer',
                                    itemOffered: {
                                        '@type': 'Service',
                                        name: 'Digital Stamp Card Loyalty Program',
                                        description:
                                            'Earn stamps with every purchase and redeem for free drinks and exclusive rewards',
                                    },
                                },
                            ],
                        },
                    })}
                </script>
            </Head>

            <div className="min-h-screen bg-white font-sans text-black selection:bg-[#ff7118] selection:text-white">

                {/* Navigation */}
                <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-black/5 bg-white/90 px-6 py-5 backdrop-blur-md lg:px-20">
                    <img
                        src={MainLogo}
                        alt="The Bad Shot Coffee Logo"
                        className="h-10 w-auto"
                    />
                    <div className="flex gap-4 text-xs font-bold tracking-widest uppercase md:gap-8">
                        <button
                            onClick={() => router.get('/customer/login')}
                            className="cursor-pointer rounded-full border border-[#ff7118] px-5 py-2 text-[#ff7118] transition-colors hover:bg-[#ff7118] hover:text-white"
                        >
                            Login
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:py-28">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        {/* Eyebrow label */}
                        <p className="inline-block rounded-full border border-[#ff7118]/30 px-4 py-1 text-xs font-bold tracking-[0.25em] text-[#ff7118] uppercase">
                            Double Espresso. Always.
                        </p>

                        <h1 className="font-serif text-6xl leading-tight tracking-tighter md:text-8xl">
                            We Like It{' '}
                            <span className="italic text-[#ff7118]">
                                Strong.
                            </span>
                        </h1>

                        <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-500 lg:mx-0">
                            Your go-to neighborhood café — bold coffee, creative
                            specialty drinks, and comfort food favorites. Not
                            just the coffee is strong. So are the memories.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <button
                                onClick={() => router.get('/customer/login')}
                                className="cursor-pointer rounded-full bg-[#ff7118] px-12 py-4 font-bold text-white transition-all hover:bg-orange-500 hover:shadow-xl active:scale-95"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black px-12 py-4 font-bold text-black transition-all hover:bg-black hover:text-white active:scale-95"
                            >
                                <Download className="h-5 w-5" />
                                Install App
                            </button>
                        </div>
                    </div>

                    <div className="relative flex flex-1 items-center justify-center">
                        <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-orange-50 md:h-[450px] md:w-[450px]" />
                        <div className="absolute -z-10 h-[200px] w-[200px] rounded-full bg-[#ff7118]/10 md:h-[300px] md:w-[300px]" />
                        <img
                            src={CoffeeArt}
                            alt="The Bad Shot Coffee Art"
                            className="h-auto w-full max-w-[400px] object-contain drop-shadow-2xl"
                        />
                    </div>
                </main>

                {/* About Strip */}
                <section className="border-y border-black/5 bg-gray-50 px-6 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="text-xl leading-relaxed text-gray-500 md:text-2xl">
                            From{' '}
                            <span className="text-black">classic lattes</span>{' '}
                            and{' '}
                            <span className="text-black">Spanish coffee</span>{' '}
                            to crowd-favorite{' '}
                            <span className="text-[#ff7118] font-semibold">croffles</span>,{' '}
                            sandwiches, and rice meals — every item is made to
                            deliver both quality and value.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold tracking-widest text-gray-500 uppercase">
                            {['Specialty Coffee', 'Double Espresso', 'Croffles', 'Comfort Food', 'Events & Catering'].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-black/10 px-4 py-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Menu Carousel */}
                <section className="bg-white px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-serif text-5xl md:text-6xl">
                                Featured{' '}
                                <span className="text-[#ff7118] italic">
                                    Menu
                                </span>
                            </h2>
                            <p className="text-gray-500">
                                Handpicked favorites from our collection
                            </p>
                        </div>

                        <Carousel
                            opts={{ align: 'start', loop: true }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {[menu1, menu2, menu3, menu4, menu5].map((img, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                                    >
                                        <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-gray-50 p-1">
                                            <div className="aspect-[3/4] overflow-hidden rounded-xl">
                                                <img
                                                    src={img}
                                                    alt={`Menu item ${index + 1}`}
                                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 -translate-x-1/2 border-black/10 bg-white hover:bg-[#ff7118] hover:text-white hover:border-[#ff7118]" />
                            <CarouselNext className="right-0 translate-x-1/2 border-black/10 bg-white hover:bg-[#ff7118] hover:text-white hover:border-[#ff7118]" />
                        </Carousel>
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-gray-50 px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="font-serif text-5xl md:text-6xl">
                                Simple Steps.{' '}
                                <br />
                                <span className="text-[#ff7118]">
                                    Strong Rewards.
                                </span>
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '01',
                                    title: 'Scan QR',
                                    desc: 'Find our standee at the counter and scan with your phone.',
                                },
                                {
                                    step: '02',
                                    title: 'Register',
                                    desc: 'Create your profile in seconds to start tracking your stamps.',
                                },
                                {
                                    step: '03',
                                    title: 'Earn Stamps',
                                    desc: 'Collect stamps with every purchase and unlock free treats.',
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative rounded-3xl border border-black/5 bg-white p-10 transition-all hover:-translate-y-1 hover:border-[#ff7118]/20 hover:shadow-xl"
                                >
                                    <span className="mb-6 block font-serif text-6xl text-black/5 transition-colors group-hover:text-[#ff7118]/20">
                                        {item.step}
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold tracking-tight text-black uppercase">
                                        {item.title}
                                    </h3>
                                    <p className="leading-relaxed text-gray-500">
                                        {item.desc}
                                    </p>
                                    <div className="mt-6 h-1 w-12 bg-black/10 transition-all group-hover:w-20 group-hover:bg-[#ff7118]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Events Banner */}
                <section className="relative overflow-hidden bg-[#ff7118] px-6 py-24">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ffffff15_0%,_transparent_70%)]" />
                    <div className="relative mx-auto max-w-4xl text-center">
                        <p className="mb-4 text-xs font-bold tracking-[0.3em] text-white/70 uppercase">
                            Events & Catering
                        </p>
                        <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-6xl">
                            Your Special Moments,{' '}
                            <span className="italic underline decoration-white/30">Brewed to Perfection.</span>
                        </h2>
                        <p className="mx-auto mb-10 max-w-xl text-lg text-white/80">
                            From weddings to celebrations, we bring the perfect coffee experience to your special moments — let us make your event unforgettable.
                        </p>
                        <a
                            href='https://www.facebook.com/profile.php?id=100094777910500'
                            target='_blank'
                            className="cursor-pointer rounded-full border-2 border-white bg-white px-12 py-4 font-bold text-[#ff7118] transition-all hover:bg-transparent hover:text-white active:scale-95"
                        >
                            Book an Event
                        </a>
                    </div>
                </section>

                {/* Gallery */}
                <section className="bg-white px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 flex flex-col items-end justify-between gap-4 border-b border-black/5 pb-8 md:flex-row">
                            <h2 className="font-serif text-5xl italic text-black">
                                The Community
                            </h2>
                            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                                @thebadshotcoffee
                            </p>
                        </div>

                        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
                            <div className="overflow-hidden rounded-sm bg-gray-100 md:col-span-2 md:row-span-2">
                                <img src={first} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 1" />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img src={third} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 2" />
                            </div>
                            <div className="row-span-2 overflow-hidden rounded-sm bg-gray-100">
                                <img src={fourth} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 3" />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img src={fifth} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 4" />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img src={sixth} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 5" />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100 md:col-span-2">
                                <img src={seventh} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 6" />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img src={eight} className="h-full w-full object-cover  transition-all duration-700 hover:-0" alt="Community photo 7" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-black/5 py-12 text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                        The Bad Shot Coffee — Strong Coffee. Stronger Memories.
                    </p>
                </footer>
            </div>
        </>
    );
}