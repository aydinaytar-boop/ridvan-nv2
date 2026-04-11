export type Lang = "tr" | "de";

export const EZAN_DUASI = {
  arabic: `اللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ`,
  tr: `Allah'ım! Bu eksiksiz davetin ve kılınacak namazın Rabbi! Muhammed (s.a.v.)'e vesileyi ve fazileti ver. Onu, kendisine va'dettiğin Makam-ı Mahmud'a ulaştır.`,
  de: `O Allah, Herr dieses vollkommenen Rufes und des bevorstehenden Gebets, gewähre Muhammad die Wasīla und die Vortrefflichkeit und erwecke ihn zu dem gelobten Rang, den Du ihm versprochen hast.`,
};

export interface DailyDua {
  source?: string;
  ar: string;
  tr: string;
  de: string;
}

export const DUA_ARCHIVE: DailyDua[] = [
  { source: "KURAN", ar: "رَبِّ زِدْنِي عِلْمًا", tr: "Rabbim! İlmimi artır.", de: "Mein Herr, mehre mein Wissen." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى", tr: "Allah'ım! Senden hidayet, takva, iffet ve gönül zenginliği isterim.", de: "O Allah, ich bitte Dich um Rechtleitung, Gottesfurcht, Keuschheit und Genügsamkeit." },
  { source: "KURAN", ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", tr: "Rabbimiz! Unutur veya yanılırsak bizi sorumlu tutma.", de: "Unser Herr, belaste uns nicht, wenn wir vergessen oder einen Fehler machen." },
  { source: "HADIS", ar: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي", tr: "Allah'ım! Beni bağışla, bana merhamet et, beni hidayete erdir, beni afiyet içinde kıl ve bana rızık ver.", de: "O Allah, vergib mir, erbarme Dich meiner, leite mich, gewähre mir Gesundheit und versorge mich." },
  { source: "KURAN", ar: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا", tr: "Rabbimiz! Biz kendimize zulmettik.", de: "Unser Herr, wir haben uns selbst Unrecht getan." },
  { source: "HADIS", ar: "اللَّهُمَّ بَارِكْ لِي فِيمَا رَزَقْتَنِي وَقِنِي عَذَابَ النَّارِ", tr: "Allah'ım! Bana verdiğin rızıkta bereket kıl ve beni cehennem azabından koru.", de: "O Allah, segne das, womit Du mich versorgt hast, und bewahre mich vor der Strafe des Feuers." },
  { source: "KURAN", ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ", tr: "Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl.", de: "Unser Herr, schenke uns Freude durch unsere Ehepartner und Kinder." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ", tr: "Allah'ım! Nimetinin yok olmasından Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor dem Schwinden Deiner Gunst." },
  { source: "KURAN", ar: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي", tr: "Rabbim! Beni ve soyumu namazı dosdoğru kılanlardan eyle.", de: "Mein Herr, mache mich und meine Nachkommen zu denen, die das Gebet verrichten." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي", tr: "Allah'ım! Nefsimin şerrinden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel meiner Seele." },
  { source: "KURAN", ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا", tr: "Rabbimiz! Bizi hidayete erdirdikten sonra kalplerimizi eğriltme.", de: "Unser Herr, lass unsere Herzen nicht abirren, nachdem Du uns rechtgeleitet hast." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ", tr: "Allah'ım! Kederden ve hüzünden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor Kummer und Traurigkeit." },
  { source: "KURAN", ar: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا", tr: "Rabbimiz! Üzerimize sabır yağdır ve ayaklarımızı sabit kıl.", de: "Unser Herr, gieße Geduld über uns aus und festige unsere Schritte." },
  { source: "HADIS", ar: "اللَّهُمَّ طَهِّرْ قَلْبِي وَحَصِّنْ فَرْجِي", tr: "Allah'ım! Kalbimi temizle ve iffetimi koru.", de: "O Allah, reinige mein Herz und bewahre meine Keuschheit." },
  { source: "KURAN", ar: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ", tr: "Rabbim! Bana indireceğin her hayra muhtacım.", de: "Mein Herr, ich bin bedürftig nach jedem Guten, das Du zu mir herabsendest." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", tr: "Allah'ım! Dünya ve ahirette afiyet isterim.", de: "O Allah, ich bitte Dich um Wohlbefinden im Diesseits und im Jenseits." },
  { source: "KURAN", ar: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ", tr: "Rabbim! Bağışla, merhamet et. Merhametlilerin en hayırlısı Sensin.", de: "Mein Herr, vergib und erbarme Dich. Du bist der Beste der Barmherzigen." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ", tr: "Allah'ım! Rızanı ve cennetini isterim.", de: "O Allah, ich bitte Dich um Dein Wohlgefallen und das Paradies." },
  { source: "KURAN", ar: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", tr: "Rabbim! Hesap gününde beni, anne-babamı ve bütün müminleri bağışla.", de: "Mein Herr, vergib mir, meinen Eltern und den Gläubigen am Tage der Abrechnung." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ", tr: "Allah'ım! Şiddetli beladan Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor schwerer Prüfung." },
  { source: "KURAN", ar: "رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ", tr: "Rabbimiz! Bizimle kavmimiz arasında hak ile hükmet.", de: "Unser Herr, entscheide zwischen uns und unserem Volk mit der Wahrheit." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا مُطْمَئِنَّةً", tr: "Allah'ım! Huzurlu bir nefis isterim.", de: "O Allah, ich bitte Dich um eine zufriedene Seele." },
  { source: "KURAN", ar: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا", tr: "Rabbimiz! Senin rahmetin ve ilmin her şeyi kuşatmıştır.", de: "Unser Herr, Deine Barmherzigkeit und Dein Wissen umfassen alles." },
  { source: "HADIS", ar: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", tr: "Allah'ım! Seni zikretmek, şükretmek ve güzel ibadet etmek için bana yardım et.", de: "O Allah, hilf mir dabei, Dich zu gedenken, Dir zu danken und Dir gut zu dienen." },
  { source: "KURAN", ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً", tr: "Rabbimiz! Bize dünyada da ahirette de iyilik ver.", de: "Unser Herr, gib uns Gutes im Diesseits und Gutes im Jenseits." },
  { source: "HADIS", ar: "اللَّهُمَّ اجْعَلْ أَوْسَعَ رِزْقِكَ عَلَيَّ عِنْدَ كِبَرِ سِنِّي", tr: "Allah'ım! En geniş rızkını ihtiyarlığımda ver.", de: "O Allah, gib mir Deinen reichsten Unterhalt im Alter." },
  { source: "KURAN", ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", tr: "Rabbim! Nimetine şükretmeyi bana ilham et.", de: "Mein Herr, gib mir die Eingebung, Dir für Deine Gabe zu danken." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ", tr: "Allah'ım! Cenneti isterim ve cehennemden Sana sığınırım.", de: "O Allah, ich bitte Dich um das Paradies und suche Zuflucht bei Dir vor dem Feuer." },
  { source: "KURAN", ar: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ", tr: "Rabbimiz! Bizi ve bizden önce iman etmiş kardeşlerimizi bağışla.", de: "Unser Herr, vergib uns und unseren Geschwistern, die uns im Glauben vorangegangen sind." },
  { source: "HADIS", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ", tr: "Allah'ım! Senin sevgini ve Seni sevenlerin sevgisini isterim.", de: "O Allah, ich bitte Dich um Deine Liebe und die Liebe derer, die Dich lieben." },
];
