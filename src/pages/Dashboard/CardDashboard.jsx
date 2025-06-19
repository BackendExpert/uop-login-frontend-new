import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import {
    CalendarDays,
    Newspaper,
    BookOpenCheck,
    Megaphone,
    Users,
    HelpCircle,
    BadgeCheck,
    ScrollText,
    UsersRound,
} from 'lucide-react';

const CardDashboard = () => {
    const [eventdata, setdataevet] = useState([]);
    const [newsdata, setnewsdata] = useState([]);
    const [resdata, setresdata] = useState([]);
    const [noticedata, setnoticedata] = useState([]);
    const [users, setusers] = useState([])
    const [faqs, setfaqs] = useState([])
    const [Diploma, setDiploma] = useState([])
    const [Certificates, setCertificates] = useState([])
    const [Societies, setSocieties] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/event.php', {
            params: { action: 'getallEvents' },
        })
            .then(res => setdataevet(res.data.Result || []))
            .catch(() => setdataevet([]));
    }, []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/news.php', {
            params: { action: 'getallNEWS' },
        })
            .then(res => setnewsdata(res.data.Result || []))
            .catch(() => setnewsdata([]));
    }, []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/research.php', {
            params: { action: 'getResearch' },
        })
            .then(res => setresdata(res.data.Result || []))
            .catch(() => setresdata([]));
    }, []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/notice.php', {
            params: { action: 'getallNotice' },
        })
            .then(res => setnoticedata(res.data.Result || []))
            .catch(() => setnoticedata([]));
    }, []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/faq.php', {
            params: { action: 'getallfaqs' },
        })
            .then(res => setfaqs(res.data.Result || []))
            .catch(() => setfaqs([]));
    }, []);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/diploma.php', {
            params: { action: 'getalldips' },
        })
            .then(res => setDiploma(res.data.Result || []))
            .catch(() => setDiploma([]));
    }, []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/cirtificate.php', {
            params: { action: 'getallcirtificate' },
        })
            .then(res => setCertificates(res.data.Result || []))
            .catch(() => setCertificates([]));
    }, []);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/society.php', {
            params: { action: 'getallsocieties' },
        })
            .then(res => setSocieties(res.data.Result || []))
            .catch(() => setSocieties([]));
    }, []);


    const admindata = [
        {
            id: 1,
            name: 'Events',
            icon: CalendarDays,
            value: eventdata.length,
            color: 'from-blue-400 to-blue-600',
        },
        {
            id: 2,
            name: 'News',
            icon: Newspaper,
            value: newsdata.length,
            color: 'from-green-400 to-green-600',
        },
        {
            id: 3,
            name: 'Research',
            icon: BookOpenCheck,
            value: resdata.length,
            color: 'from-yellow-400 to-yellow-600',
        },
        {
            id: 4,
            name: 'Notices',
            icon: Megaphone,
            value: noticedata.length,
            color: 'from-rose-400 to-rose-600',
        },
        {
            id: 5,
            name: 'Users',
            icon: Users,
            value: users.length,
            color: 'from-violet-400 to-violet-600',
        },
        {
            id: 6,
            name: 'FAQs',
            icon: HelpCircle,
            value: faqs.length,
            color: 'from-amber-400 to-amber-600',
        },
        {
            id: 7,
            name: 'Diploma',
            icon: BadgeCheck,
            value: Diploma.length,
            color: 'from-sky-400 to-sky-600',
        },
        {
            id: 8,
            name: 'Certificates',
            icon: ScrollText,
            value: Certificates.length,
            color: 'from-lime-400 to-lime-600',
        },
        {
            id: 9,
            name: 'Societies',
            icon: UsersRound,
            value: Societies.length,
            color: 'from-fuchsia-400 to-fuchsia-600',
        },
    ];

    return (
        <div className="mt-6">
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                {admindata.map((data, index) => {
                    const Icon = data.icon;
                    return (
                        <div
                            key={index}
                            className={`rounded-2xl text-white px-6 py-6 shadow-md hover:shadow-xl transition duration-300 bg-gradient-to-br ${data.color}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        <CountUp end={data.value} duration={2} />+
                                    </h1>
                                    <p className="mt-1 text-lg font-medium">{data.name}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-full">
                                    <Icon className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardDashboard;
