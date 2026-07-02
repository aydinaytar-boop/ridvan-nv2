export type Lang = "tr" | "de";

export const EZAN_DUASI = {
  arabic: `اللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ`,
  tr: `Allah'ım! Bu eksiksiz davetin ve kılınacak namazın Rabbi! Muhammed (s.a.v.)'e vesileyi ve fazileti ver. Onu, kendisine va'dettiğin Makam-ı Mahmud'a ulaştır.`,
  de: `O Allah, Herr dieses vollkommenen Rufes und des bevorstehenden Gebets, gewähre Muhammad die Wasīla und die Vortrefflichkeit und erwecke ihn zu dem gelobten Rang, den Du ihm versprochen hast.`,
};

export interface DailyDua {
  ar: string;
  tr: string;
  de: string;
}

export const DUA_ARCHIVE: DailyDua[] = [
  { ar: "رَبِّ زِدْنِي عِلْمًا", tr: "Rabbim! İlmimi artır.", de: "Mein Herr, mehre mein Wissen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى", tr: "Allah'ım! Senden hidayet, takva, iffet ve gönül zenginliği isterim.", de: "O Allah, ich bitte Dich um Rechtleitung, Gottesfurcht, Keuschheit und Genügsamkeit." },
  { ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", tr: "Rabbimiz! Unutur veya yanılırsak bizi sorumlu tutma.", de: "Unser Herr, belaste uns nicht, wenn wir vergessen oder einen Fehler machen." },
  { ar: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي", tr: "Allah'ım! Beni bağışla, bana merhamet et, beni hidayete erdir, beni afiyet içinde kıl ve bana rızık ver.", de: "O Allah, vergib mir, erbarme Dich meiner, leite mich, gewähre mir Gesundheit und versorge mich." },
  { ar: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", tr: "Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen mutlaka ziyana uğrayanlardan oluruz.", de: "Unser Herr, wir haben uns selbst Unrecht getan. Wenn Du uns nicht vergibst und Dich nicht unser erbarmst, werden wir zu den Verlierern gehören." },
  { ar: "اللَّهُمَّ بَارِكْ لِي فِيمَا رَزَقْتَنِي وَقِنِي عَذَابَ النَّارِ", tr: "Allah'ım! Bana verdiğin rızıkta bereket kıl ve beni cehennem azabından koru.", de: "O Allah, segne das, womit Du mich versorgt hast, und bewahre mich vor der Strafe des Feuers." },
  { ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", tr: "Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl ve bizi takva sahiplerine önder eyle.", de: "Unser Herr, schenke uns Freude durch unsere Ehepartner und Kinder und mache uns zu Vorbildern der Gottesfürchtigen." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ", tr: "Allah'ım! Nimetinin yok olmasından ve afiyetinin değişmesinden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor dem Schwinden Deiner Gunst und dem Wandel Deines Wohlbefindens." },
  { ar: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ", tr: "Rabbim! Beni ve soyumu namazı dosdoğru kılanlardan eyle. Rabbimiz! Duamı kabul buyur.", de: "Mein Herr, mache mich und meine Nachkommen zu denen, die das Gebet verrichten. Unser Herr, nimm mein Gebet an." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ", tr: "Allah'ım! Nefsimin şerrinden ve şeytanın şerrinden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel meiner Seele und dem Übel des Satans." },
  { ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ", tr: "Rabbimiz! Bizi hidayete erdirdikten sonra kalplerimizi eğriltme. Bize katından rahmet bağışla. Şüphesiz bağışı en çok olan Sensin.", de: "Unser Herr, lass unsere Herzen nicht abirren, nachdem Du uns rechtgeleitet hast, und schenke uns Barmherzigkeit von Dir. Du bist wahrlich der Großzügige." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ", tr: "Allah'ım! Kederden, hüzünden, acizlikten, tembellikten, cimrilikten, korkaklıktan, borç ağırlığından ve insanların baskısından Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor Kummer, Traurigkeit, Unfähigkeit, Trägheit, Geiz, Feigheit, drückenden Schulden und der Unterdrückung durch Menschen." },
  { ar: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", tr: "Rabbimiz! Üzerimize sabır yağdır, ayaklarımızı sabit kıl ve kâfirler topluluğuna karşı bize yardım et.", de: "Unser Herr, gieße Geduld über uns aus, festige unsere Schritte und hilf uns gegen das ungläubige Volk." },
  { ar: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ وَعَمَلِي مِنَ الرِّيَاءِ وَلِسَانِي مِنَ الْكَذِبِ", tr: "Allah'ım! Kalbimi nifaktan, amelimi riyadan ve dilimi yalanıdan temizle.", de: "O Allah, reinige mein Herz von Heuchelei, meine Taten von Schaustellung und meine Zunge von Lügen." },
  { ar: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ", tr: "Rabbim! Bana indireceğin her hayra muhtacım.", de: "Mein Herr, ich bin bedürftig nach jedem Guten, das Du zu mir herabsendest." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", tr: "Allah'ım! Dünya ve ahirette afiyet isterim.", de: "O Allah, ich bitte Dich um Wohlbefinden im Diesseits und im Jenseits." },
  { ar: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ", tr: "Rabbim! Bağışla, merhamet et. Merhametlilerin en hayırlısı Sensin.", de: "Mein Herr, vergib und erbarme Dich. Du bist der Beste der Barmherzigen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ", tr: "Allah'ım! Rızanı ve cennetini isterim; gazabından ve cehenneminden Sana sığınırım.", de: "O Allah, ich bitte Dich um Dein Wohlgefallen und das Paradies und suche Zuflucht vor Deinem Zorn und dem Feuer." },
  { ar: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", tr: "Rabbim! Hesap gününde beni, anne-babamı ve bütün müminleri bağışla.", de: "Mein Herr, vergib mir, meinen Eltern und den Gläubigen am Tage der Abrechnung." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ وَدَرَكِ الشَّقَاءِ وَسُوءِ الْقَضَاءِ وَشَمَاتَةِ الْأَعْدَاءِ", tr: "Allah'ım! Şiddetli beladan, kötü akıbetten, kötü kaderin gelip çatmasından ve düşmanların sevinmesinden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor schwerer Prüfung, unheilvollem Ausgang, schlechtem Schicksal und der Schadenfreude der Feinde." },
  { ar: "رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنتَ خَيْرُ الْفَاتِحِينَ", tr: "Rabbimiz! Bizimle kavmimiz arasında hak ile hükmet. Sen hükmedenlerin en hayırlısısın.", de: "Unser Herr, entscheide zwischen uns und unserem Volk mit der Wahrheit. Du bist der Beste der Entscheidenden." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا مُطْمَئِنَّةً تُؤْمِنُ بِلِقَائِكَ وَتَرْضَى بِقَضَائِكَ وَتَقْنَعُ بِعَطَائِكَ", tr: "Allah'ım! Sana kavuşmaya iman eden, hükmüne razı olan ve bağışına kanaat eden huzurlu bir nefis isterim.", de: "O Allah, ich bitte Dich um eine zufriedene Seele, die an Deine Begegnung glaubt, mit Deinem Urteil zufrieden ist und mit Deiner Gabe genügsam ist." },
  { ar: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ", tr: "Rabbimiz! Senin rahmetin ve ilmin her şeyi kuşatmıştır. Tevbe edip Senin yoluna uyanları bağışla.", de: "Unser Herr, Deine Barmherzigkeit und Dein Wissen umfassen alles. Vergib denen, die bereuen und Deinen Weg befolgen." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْبُخْلِ وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَأَعُوذُ بِكَ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ", tr: "Allah'ım! Cimrilikten, korkaklıktan ve ömrün en kötü çağına ulaşmaktan Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor Geiz, Feigheit und davor, in das gebrechlichste Alter zurückversetzt zu werden." },
  { ar: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا", tr: "Rabbimiz! Cehennem azabını bizden uzaklaştır. Onun azabı gerçekten çok çetindir.", de: "Unser Herr, wende die Strafe der Hölle von uns ab. Ihre Strafe ist wahrlich unentrinnbar." },
  { ar: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي", tr: "Allah'ım! İşimin dayanağı olan dinimi ve geçimimin temeli olan dünyamı ıslah eyle.", de: "O Allah, verbessere für mich meine Religion, die der Halt meiner Angelegenheiten ist, und mein Diesseits, in dem mein Lebensunterhalt ist." },
  { ar: "رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ", tr: "Rabbimiz! Sana güvendik, Sana yöneldik ve dönüşümüz Sanadır.", de: "Unser Herr, auf Dich vertrauen wir, zu Dir wenden wir uns und zu Dir ist die Heimkehr." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا سَلِيمًا وَلِسَانًا صَادِقًا", tr: "Allah'ım! Senden selim bir kalp ve doğru bir dil isterim.", de: "O Allah, ich bitte Dich um ein reines Herz und eine wahrhaftige Zunge." },
  { ar: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ وَتُبْ عَلَيْنَا إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ", tr: "Rabbimiz! Bizden kabul buyur. Şüphesiz Sen işiten ve bilensin. Tevbemizi kabul et. Şüphesiz Sen tevbeleri kabul eden, çok merhametli olansın.", de: "Unser Herr, nimm es von uns an. Du bist wahrlich der Hörende, der Wissende. Und nimm unsere Reue an. Du bist wahrlich der Reue-Annehmende, der Barmherzige." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رَحْمَةً مِنْ عِنْدِكَ تَهْدِي بِهَا قَلْبِي وَتَجْمَعُ بِهَا أَمْرِي", tr: "Allah'ım! Kalbimi hidayete erdirecek ve işlerimi düzeltecek katından bir rahmet isterim.", de: "O Allah, ich bitte Dich um eine Barmherzigkeit von Dir, durch die Du mein Herz leitest und meine Angelegenheiten ordnest." },
  { ar: "رَبَّنَا وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", tr: "Rabbimiz! Bizi affet, bizi bağışla, bize merhamet et. Sen bizim Mevlâmızsın. Kâfirler topluluğuna karşı bize yardım et.", de: "Unser Herr, verzeihe uns, vergib uns und erbarme Dich unser. Du bist unser Beschützer, so hilf uns gegen das ungläubige Volk." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ وَالْعَزِيمَةَ عَلَى الرُّشْدِ", tr: "Allah'ım! İşlerimde sebat ve doğruya yönelme azmi isterim.", de: "O Allah, ich bitte Dich um Standhaftigkeit in meinen Angelegenheiten und Entschlossenheit zum rechten Weg." },
  { ar: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ", tr: "Rabbimiz! Üzerimize sabır yağdır ve bizi Müslümanlar olarak vefat ettir.", de: "Unser Herr, gieße Geduld über uns aus und lass uns als Muslime sterben." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ وَأَعُوذُ بِكَ مِنَ النَّارِ", tr: "Allah'ım! Senden cenneti ve ona yaklaştıran söz ve amelleri isterim. Cehennemden Sana sığınırım.", de: "O Allah, ich bitte Dich um das Paradies und um Worte und Taten, die dazu führen, und suche Zuflucht vor dem Feuer." },
  { ar: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا", tr: "Rabbim! Beni doğrulukla girdireceğin yere girdir, doğrulukla çıkaracağın yerden çıkar ve bana katından yardımcı bir güç ver.", de: "Mein Herr, lass mich aufrichtig eintreten und aufrichtig hinausgehen und gib mir von Dir eine unterstützende Kraft." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْفِتَنِ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ", tr: "Allah'ım! Açık ve gizli fitnelerden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor den Versuchungen, den offensichtlichen und den verborgenen." },
  { ar: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ", tr: "Rabbim! Şeytanların vesveselerinden Sana sığınırım. Rabbim! Yanımda bulunmalarından da Sana sığınırım.", de: "Mein Herr, ich suche Zuflucht bei Dir vor den Einflüsterungen der Satane und davor, dass sie bei mir erscheinen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي وَنُورًا فِي سَمْعِي وَنُورًا فِي بَصَرِي", tr: "Allah'ım! Kalbime, işitmeme ve görmeme nur ver.", de: "O Allah, gib meinem Herzen, meinem Gehör und meinem Blick Licht." },
  { ar: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", tr: "Rabbimiz! Nurumuzu tamamla ve bizi bağışla. Şüphesiz Sen her şeye kadirsin.", de: "Unser Herr, vollende unser Licht und vergib uns. Du hast wahrlich Macht über alle Dinge." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الْخَاتِمَةِ", tr: "Allah'ım! Senden güzel bir son isterim.", de: "O Allah, ich bitte Dich um ein gutes Ende." },
  { ar: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ", tr: "Rabbimiz! Bizi inkâr edenler için fitne kılma ve bizi bağışla. Rabbimiz! Şüphesiz Sen güçlü ve hikmet sahibisin.", de: "Unser Herr, mache uns nicht zur Versuchung für die Ungläubigen und vergib uns. Unser Herr, Du bist wahrlich der Mächtige, der Weise." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ فِعْلَ الْخَيْرَاتِ وَتَرْكَ الْمُنْكَرَاتِ وَحُبَّ الْمَسَاكِينِ", tr: "Allah'ım! Hayırlı işler yapmayı, kötülüklerden uzak durmayı ve fakirleri sevmeyi isterim.", de: "O Allah, ich bitte Dich um gute Taten, das Meiden schlechter Dinge und die Liebe zu den Armen." },
  { ar: "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ", tr: "Rabbimiz! Biz iman ettik. Günahlarımızı bağışla ve bizi cehennem azabından koru.", de: "Unser Herr, wir haben geglaubt. Vergib uns unsere Sünden und bewahre uns vor der Strafe des Feuers." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", tr: "Allah'ım! Dünya ve ahirette af ve afiyet isterim.", de: "O Allah, ich bitte Dich um Vergebung und Wohlbefinden im Diesseits und im Jenseits." },
  { ar: "رَبِّ اغْفِرْ لِي وَلِأَخِي وَأَدْخِلْنَا فِي رَحْمَتِكَ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", tr: "Rabbim! Beni ve kardeşimi bağışla, bizi rahmetine dahil et. Sen merhametlilerin en merhametlisisin.", de: "Mein Herr, vergib mir und meinem Bruder und nimm uns in Deine Barmherzigkeit auf. Du bist der Barmherzigste der Barmherzigen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا وَعِلْمًا نَافِعًا وَعَمَلًا مُتَقَبَّلًا", tr: "Allah'ım! Helal rızık, faydalı ilim ve kabul edilen amel isterim.", de: "O Allah, ich bitte Dich um erlaubte Versorgung, nützliches Wissen und angenommene Taten." },
  { ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", tr: "Rabbimiz! Bize dünyada iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.", de: "Unser Herr, gib uns Gutes im Diesseits und Gutes im Jenseits und bewahre uns vor der Strafe des Feuers." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ", tr: "Allah'ım! Peygamberin Muhammed'in Senden istediği hayırların tamamını Senden isterim.", de: "O Allah, ich bitte Dich um all das Gute, um das Dein Prophet Muhammad (Friede sei mit ihm) Dich gebeten hat." },
  { ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي", tr: "Rabbim! Göğsüme genişlik ver. İşimi bana kolaylaştır. Dilimdeki düğümü çöz ki sözümü anlasınlar.", de: "Mein Herr, öffne mir meine Brust, erleichtere mir meine Angelegenheit, löse den Knoten in meiner Zunge, damit sie meine Worte verstehen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا خَاشِعًا وَدُعَاءً مُسْتَجَابًا وَلِسَانًا ذَاكِرًا", tr: "Allah'ım! Huşu sahibi bir kalp, kabul edilen bir dua ve zikreden bir dil isterim.", de: "O Allah, ich bitte Dich um ein demütiges Herz, ein erhörtes Gebet und eine gedenkende Zunge." },
  { ar: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا", tr: "Rabbimiz! Bizi Sana teslim olmuş kimseler kıl. Soyumuzdan da Sana teslim olmuş bir ümmet çıkar. Bize ibadet usullerimizi göster. Tevbemizi kabul et.", de: "Unser Herr, mache uns zu Dir ergebenen Muslimen und aus unserer Nachkommenschaft eine Dir ergebene Gemeinschaft. Zeige uns unsere Riten und nimm unsere Reue an." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ صِدْقًا فِي الْقَوْلِ وَالْعَمَلِ وَإِخْلَاصًا فِي السِّرِّ وَالْعَلَنِ", tr: "Allah'ım! Sözde ve amelde doğruluk, gizlide ve açıkta ihlas isterim.", de: "O Allah, ich bitte Dich um Aufrichtigkeit in Wort und Tat sowie Aufrichtigkeit im Verborgenen und Offensichtlichen." },
  { ar: "أَنتَ وَلِيُّنَا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الْغَافِرِينَ", tr: "Sen bizim velimizsin. Bizi bağışla, bize merhamet et. Sen bağışlayanların en hayırlısısın.", de: "Du bist unser Beschützer. Vergib uns und erbarme Dich unser. Du bist der Beste der Vergeber." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضًا بَعْدَ الْقَضَاءِ وَبَرْدَ الْعَيْشِ بَعْدَ الْمَوْتِ", tr: "Allah'ım! Hükmünden sonra rıza ve ölümden sonra hayatın güzelliğini isterim.", de: "O Allah, ich bitte Dich um Zufriedenheit nach Deinem Urteil und um die Süße des Lebens nach dem Tod." },
  { ar: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ", tr: "Rabbimiz! İman ettik. Bizi bağışla, bize merhamet et. Sen merhametlilerin en hayırlısısın.", de: "Unser Herr, wir haben geglaubt. Vergib uns und erbarme Dich unser. Du bist der Beste der Barmherzigen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ سَعَادَةً لَا تَشْقَى بَعْدَهَا أَبَدًا", tr: "Allah'ım! Sonu ebediyen bedbahtlık olmayan bir saadet isterim.", de: "O Allah, ich bitte Dich um ein Glück, dem niemals Unglück folgt." },
  { ar: "رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ", tr: "Rabbim! Katında bana cennette bir ev yap ve beni zalimler topluluğundan kurtar.", de: "Mein Herr, errichte mir bei Dir ein Haus im Paradies und rette mich vor dem ungerechten Volk." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا مُطْمَئِنَّةً تُؤْمِنُ بِلِقَائِكَ", tr: "Allah'ım! Sana kavuşmaya iman eden huzurlu bir nefis isterim.", de: "O Allah, ich bitte Dich um eine zufriedene Seele, die an Deine Begegnung glaubt." },
  { ar: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا", tr: "Rabbimiz! Gücümüzün yetmediği şeyleri bize yükleme. Bizi affet, bağışla ve bize merhamet et.", de: "Unser Herr, belaste uns nicht mit dem, was wir nicht tragen können. Verzeihe uns, vergib uns und erbarme Dich unser." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا نَقِيًّا بَعِيدًا عَنِ الْكِبْرِ وَالْحَسَدِ", tr: "Allah'ım! Kibir ve hasetten uzak tertemiz bir kalp isterim.", de: "O Allah, ich bitte Dich um ein reines, lauteres Herz, fern von Hochmut und Neid." },
  { ar: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", tr: "Rabbim! Onlar beni küçükken yetiştirdikleri gibi Sen de onlara merhamet et.", de: "Mein Herr, erbarme Dich ihrer, wie sie sich meiner annahmen, als ich klein war." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ صِحَّةً فِي إِيمَانٍ وَإِيمَانًا فِي حُسْنِ خُلُقٍ", tr: "Allah'ım! İmanla birlikte sağlık ve güzel ahlakla birlikte iman isterim.", de: "O Allah, ich bitte Dich um Gesundheit im Glauben und Glauben mit gutem Charakter." },
  { ar: "رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ وَمَا يَخْفَى عَلَى اللَّهِ مِن شَيْءٍ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ", tr: "Rabbimiz! Gizlediğimizi de açıkladığımızı da Sen bilirsin. Yerde ve gökte hiçbir şey Allah'tan gizli kalmaz.", de: "Unser Herr, Du weißt, was wir verbergen und was wir offenlegen. Nichts auf Erden und am Himmel ist vor Allah verborgen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا وَاسِعًا حَلَالًا طَيِّبًا", tr: "Allah'ım! Helal, geniş ve temiz bir rızık isterim.", de: "O Allah, ich bitte Dich um eine weite, erlaubte und gute Versorgung." },
  { ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً", tr: "Rabbimiz! Bize dünyada da ahirette de iyilik ver.", de: "Unser Herr, gib uns Gutes im Diesseits und Gutes im Jenseits." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لَا يَمْلِكُهَا إِلَّا أَنتَ", tr: "Allah'ım! Fazlından ve rahmetinden isterim; zira bunlara yalnız Sen sahipsin.", de: "O Allah, ich bitte Dich um Deinen Überschuss und Deine Barmherzigkeit, denn nur Du besitzt sie." },
  { ar: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", tr: "Rabbim! Bana salih evlatlar bağışla.", de: "Mein Herr, schenke mir rechtschaffene Nachkommen." },
  { ar: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", tr: "Allah'ım! Seni zikretmek, Sana şükretmek ve Sana güzelce ibadet etmek için bize yardım et.", de: "O Allah, hilf mir, Deiner zu gedenken, Dir zu danken und Dich auf beste Weise zu dienen." },
  { ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ", tr: "Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl.", de: "Unser Herr, schenke uns Freude durch unsere Ehepartner und Kinder." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالسَّدَادَ وَالتُّقَى وَالْغِنَى", tr: "Allah'ım! Senden hidayet, isabet, takva ve gönül zenginliği isterim.", de: "O Allah, ich bitte Dich um Rechtleitung, Treffsicherheit, Gottesfurcht und Genügsamkeit." },
  { ar: "عَلَى اللَّهِ تَوَكَّلْنَا رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ", tr: "Allah'a tevekkül ettik. Rabbimiz! Bizi zalim topluluk için bir fitne kılma. Bizi rahmetinle inkârcı topluluktan kurtar.", de: "Auf Allah vertrauen wir. Unser Herr, mache uns nicht zur Versuchung für das ungerechte Volk. Und rette uns durch Deine Barmherzigkeit vor dem ungläubigen Volk." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ صِدْقَ التَّوَكُّلِ عَلَيْكَ وَحُسْنَ الظَّنِّ بِكَ", tr: "Allah'ım! Senden Sana tam tevekkül ve Sana güzel zan isterim.", de: "O Allah, ich bitte Dich um aufrichtiges Vertrauen auf Dich und gute Gedanken über Dich." },
  { ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا", tr: "Rabbimiz! Unutur veya yanılırsak bizi sorumlu tutma. Rabbimiz! Bize ağır yük yükleme.", de: "Unser Herr, belaste uns nicht, wenn wir vergessen oder einen Fehler machen. Unser Herr, lege uns keine schwere Last auf." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا تَقِيَّةً زَكِيَّةً", tr: "Allah'ım! Senden takva sahibi ve temiz bir nefis isterim.", de: "O Allah, ich bitte Dich um eine gottesfürchtige, reine Seele." },
  { ar: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا", tr: "Rabbimiz! Senin rahmetin ve ilmin her şeyi kuşatmıştır.", de: "Unser Herr, Deine Barmherzigkeit und Dein Wissen umfassen alles." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِقَّةَ الْقَلْبِ وَخُشُوعَ الْجَوَارِحِ", tr: "Allah'ım! Kalp yumuşaklığı ve azaların huşuu isterim.", de: "O Allah, ich bitte Dich um Sanftheit des Herzens und Demut der Glieder." },
  { ar: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدتَّهُمْ وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ", tr: "Rabbimiz! Onları, kendilerine vaad ettiğin Adn cennetlerine koy. Babalarından, eşlerinden ve çocuklarından salih olanları da.", de: "Unser Herr, lass sie in die Gärten von Eden eingehen, die Du ihnen versprochen hast, sowie ihre rechtschaffenen Väter, Ehepartner und Kinder." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَن يُحِبُّكَ وَحُبَّ عَمَلٍ يُقَرِّبُنِي إِلَى حُبِّكَ", tr: "Allah'ım! Sevgini, Seni sevenlerin sevgisini ve Senin sevgine yaklaştıracak amelin sevgisini isterim.", de: "O Allah, ich bitte Dich um Deine Liebe, die Liebe derer, die Dich lieben, und die Liebe zu Taten, die mich Deiner Liebe näherbringen." },
  { ar: "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ", tr: "Rabbimiz! Şüphe olmayan bir günde insanları Sen toplayacaksın. Allah vaadinden dönmez.", de: "Unser Herr, Du wirst die Menschen an einem Tag versammeln, an dem kein Zweifel besteht. Wahrlich, Allah bricht sein Versprechen nicht." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَسْأَلَةِ وَخَيْرَ الدُّعَاءِ وَخَيْرَ النَّجَاحِ وَخَيْرَ الْعَمَلِ", tr: "Allah'ım! En hayırlı istemeyi, en hayırlı duayı, en hayırlı başarıyı ve en hayırlı ameli isterim.", de: "O Allah, ich bitte Dich um das Beste des Bittens, des Gebets, des Erfolgs und der Tat." },
  { ar: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ", tr: "Rabbim! Beni ve soyumdan gelenleri namazı dosdoğru kılanlardan eyle. Rabbimiz! Duamı kabul buyur. Rabbimiz! Beni ve anne-babamı bağışla.", de: "Mein Herr, mache mich und meine Nachkommen zu denen, die das Gebet verrichten. Unser Herr, nimm mein Gebet an. Unser Herr, vergib mir und meinen Eltern." },
  { ar: "اللَّهُمَّ اجْعَلْ أَوَّلَ هَذَا الْيَوْمِ صَلَاحًا وَأَوْسَطَهُ نَجَاحًا وَآخِرَهُ فَلَاحًا", tr: "Allah'ım! Bu günün başını ıslah, ortasını başarı ve sonunu kurtuluş kıl.", de: "O Allah, mache den Beginn dieses Tages zur Besserung, seine Mitte zum Erfolg und sein Ende zur Erlösung." },
  { ar: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", tr: "Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen mutlaka ziyana uğrayanlardan oluruz.", de: "Unser Herr, wir haben uns selbst Unrecht getan. Wenn Du uns nicht vergibst und Dich nicht unser erbarmst, werden wir zu den Verlierern gehören." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رَوْحًا وَرَاحَةً وَفَرَجًا قَرِيبًا", tr: "Allah'ım! Huzur, ferahlık ve yakın bir kurtuluş isterim.", de: "O Allah, ich bitte Dich um Ruhe, Erleichterung und baldige Erlösung." },
  { ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً", tr: "Rabbimiz! Bizi hidayete erdirdikten sonra kalplerimizi eğriltme ve bize katından rahmet bağışla.", de: "Unser Herr, lass unsere Herzen nicht abirren, nachdem Du uns rechtgeleitet hast, und schenke uns Barmherzigkeit von Dir." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي وَنُورًا فِي قَبْرِي وَنُورًا فِي آخِرَتِي", tr: "Allah'ım! Kalbime, kabrima ve ahiretine nur ver.", de: "O Allah, gib meinem Herzen, meinem Grab und meinem Jenseits Licht." },
  { ar: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا", tr: "Rabbimiz! Üzerimize sabır yağdır ve ayaklarımızı sabit kıl.", de: "Unser Herr, gieße Geduld über uns aus und festige unsere Schritte." },
  { ar: "اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي", tr: "Allah'ım! Hataları, cahilliğimi ve işimde aşırılığımı bağışla.", de: "O Allah, vergib mir meinen Fehler, meine Unwissenheit und mein Übermaß in meinen Angelegenheiten." },
  { ar: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا", tr: "Rabbimiz! İman ettik. Bizi bağışla ve bize merhamet et.", de: "Unser Herr, wir haben geglaubt. Vergib uns und erbarme Dich unser." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ التَّوْبَةَ وَالْمَغْفِرَةَ وَالرَّحْمَةَ", tr: "Allah'ım! Tevbe, mağfiret ve rahmet isterim.", de: "O Allah, ich bitte Dich um Reue, Vergebung und Barmherzigkeit." },
  { ar: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ", tr: "Rabbim! Bağışla, merhamet et. Merhametlilerin en hayırlısı Sensin.", de: "Mein Herr, vergib und erbarme Dich. Du bist der Beste der Barmherzigen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ يَسَارًا فِي الدُّنْيَا وَالْآخِرَةِ", tr: "Allah'ım! Dünya ve ahirette kolaylık isterim.", de: "O Allah, ich bitte Dich um Leichtigkeit im Diesseits und im Jenseits." },
  { ar: "رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ", tr: "Rabbimiz! Gizlediğimizi de açıkladığımızı da Sen bilirsin.", de: "Unser Herr, Du weißt, was wir verbergen und was wir offenlegen." },
  { ar: "اللَّهُمَّ اجْعَلْ خَيْرَ عُمُرِي آخِرَهُ وَخَيْرَ عَمَلِي خَوَاتِمَهُ وَخَيْرَ أَيَّامِي يَوْمَ أَلْقَاكَ", tr: "Allah'ım! Ömrümün en hayırlısını sonuna, amelimin en hayırlısını sonuna, günlerimin en hayırlısını Sana kavuşacağım güne kıl.", de: "O Allah, mache das Beste meines Lebens zu seinem Ende, das Beste meiner Taten zu seinen letzten, und den besten meiner Tage zu dem Tag, an dem ich Dir begegne." },
  { ar: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ", tr: "Rabbimiz! Bizden kabul buyur. Şüphesiz Sen işiten ve bilensin.", de: "Unser Herr, nimm es von uns an. Du bist wahrlich der Hörende, der Wissende." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ وَعَذَابِ الْقَبْرِ", tr: "Allah'ım! Küfürden, fakirlikten ve kabir azabından Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor Unglauben, Armut und der Strafe des Grabes." },
  { ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", tr: "Rabbimiz! Unutur veya yanılırsak bizi sorumlu tutma.", de: "Unser Herr, belaste uns nicht, wenn wir vergessen oder einen Fehler machen." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ", tr: "Allah'ım! Bildiğim ve bilmediğim bütün hayırları, acil ve ertelenmiş olanlarını Senden isterim.", de: "O Allah, ich bitte Dich um alles Gute, das sofortige und das spätere, das mir bekannte und das unbekannte." },
  { ar: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", tr: "Rabbimiz! Günahlarımızı ve işlerimizdeki aşırılığımızı bağışla, ayaklarımızı sabit kıl ve inkârcı topluluğa karşı bize yardım et.", de: "Unser Herr, vergib uns unsere Sünden und unser Übermaß in unseren Angelegenheiten, festige unsere Schritte und hilf uns gegen das ungläubige Volk." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا لَا يَرْتَدُّ وَنَعِيمًا لَا يَنْفَدُ وَمُرَافَقَةَ النَّبِيِّ مُحَمَّدٍ", tr: "Allah'ım! Geri dönmeyen bir iman, tükenmeyen bir nimet ve Peygamber Muhammed'e komşuluk isterim.", de: "O Allah, ich bitte Dich um einen Glauben, der nicht wankt, eine Gunst, die nicht endet, und die Gesellschaft des Propheten Muhammad." },
  { ar: "رَبَّنَا هَبْ لَنَا مِنَ الصَّالِحِينَ", tr: "Rabbimiz! Bize salih nesil bağışla.", de: "Unser Herr, schenke uns rechtschaffene Nachkommen." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْبُخْلِ وَالْهَرَمِ", tr: "Allah'ım! Acizlikten, tembellikten, korkaklıktan, cimrilikten ve ihtiyarlık güçsüzlüğünden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor Unfähigkeit, Trägheit, Feigheit, Geiz und Altersschwäche." },
  { ar: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا", tr: "Rabbimiz! Bize katından rahmet ver ve işimizde bize doğru yolu kolaylaştır.", de: "Unser Herr, gib uns von Dir Barmherzigkeit und bereite für uns in unserer Angelegenheit den rechten Weg." },
  { ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ", tr: "Allah'ım! Sen benim Rabbimsin. Senden başka ilah yoktur. Beni Sen yarattın. Ben Senin kulunum ve gücüm yettiğince Sana verdiğim söz ve ahit üzereyim.", de: "O Allah, Du bist mein Herr. Es gibt keinen Gott außer Dir. Du hast mich erschaffen. Ich bin Dein Diener und halte meinen Bund und mein Versprechen an Dich nach besten Kräften." },
  { ar: "رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا", tr: "Rabbimiz! İmana davet eden birinin 'Rabbinize iman edin' diye çağırdığını duyduk ve iman ettik. Rabbimiz! Günahlarımızı bağışla.", de: "Unser Herr, wir hörten einen Rufer, der zum Glauben rief: Glaubt an euren Herrn! Und wir glaubten. Unser Herr, vergib uns unsere Sünden." },
  { ar: "اللَّهُمَّ زَيِّنَّا بِزِينَةِ الْإِيمَانِ وَاجْعَلْنَا هُدَاةً مَهْدِيِّينَ", tr: "Allah'ım! Bizi iman ziynetiyle süsle ve bizi hidayet bulan hidayet ediciler kıl.", de: "O Allah, schmücke uns mit dem Schmuck des Glaubens und mache uns zu Rechtgeleiteten, die andere leiten." },
  { ar: "رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ", tr: "Rabbimiz! Peygamberlerin aracılığıyla bize vaad ettiğin şeyleri ver ve kıyamet gününde bizi rezil etme.", de: "Unser Herr, gib uns, was Du uns durch Deine Gesandten versprochen hast, und beschäme uns nicht am Tag der Auferstehung." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الصِّحَّةَ وَالْعَافِيَةَ وَالْأَمَانَةَ وَحُسْنَ الْخُلُقِ وَالرِّضَا بِالْقَدَرِ", tr: "Allah'ım! Sağlık, afiyet, emanet, güzel ahlak ve kadere rıza isterim.", de: "O Allah, ich bitte Dich um Gesundheit, Wohlbefinden, Vertrauen, guten Charakter und Zufriedenheit mit dem Schicksal." },
  { ar: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا", tr: "Rabbimiz! Bizi ve imanda bizden önce geçmiş kardeşlerimizi bağışla. Kalplerimizde iman edenlere karşı kin bırakma.", de: "Unser Herr, vergib uns und unseren Brüdern, die uns im Glauben vorangingen, und lass in unseren Herzen keinen Groll gegen die Gläubigen." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشِّقَاقِ وَالنِّفَاقِ وَسُوءِ الْأَخْلَاقِ", tr: "Allah'ım! Ayrılık, münafıklık ve kötü ahlaktan Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor Spaltung, Heuchelei und schlechtem Charakter." },
  { ar: "رَبَّنَا أَخْرِجْنَا مِنْ هَٰذِهِ الْقَرْيَةِ الظَّالِمِ أَهْلُهَا وَاجْعَل لَّنَا مِن لَّدُنكَ وَلِيًّا وَاجْعَل لَّنَا مِن لَّدُنكَ نَصِيرًا", tr: "Rabbimiz! Bizi halkı zalim olan bu şehirden çıkar. Bize katından bir dost ve yardımcı ver.", de: "Unser Herr, rette uns aus dieser Stadt, deren Bewohner ungerecht sind, und gib uns von Dir einen Beschützer und Helfer." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الظَّنِّ بِكَ وَصِدْقَ الرَّجَاءِ فِيكَ", tr: "Allah'ım! Sana hüsnüzan ve Sende gerçek bir ümit isterim.", de: "O Allah, ich bitte Dich um gute Gedanken über Dich und aufrichtige Hoffnung auf Dich." },
  { ar: "رَبَّنَا وَأَدْخِلْنَا فِي رَحْمَتِكَ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", tr: "Rabbimiz! Bizi rahmetine dahil et. Sen merhametlilerin en merhametlisisin.", de: "Unser Herr, nimm uns in Deine Barmherzigkeit auf. Du bist der Barmherzigste der Barmherzigen." },
  { ar: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي بَصَرِي نُورًا وَفِي سَمْعِي نُورًا", tr: "Allah'ım! Kalbime, gözüme ve kulağıma nur kıl.", de: "O Allah, gib meinem Herzen, meinem Blick und meinem Gehör Licht." },
  { ar: "رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا", tr: "Rabbimiz! Sana güvendik, Sana yöneldik ve dönüşümüz Sanadır. Rabbimiz! Bizi inkâr edenler için fitne kılma.", de: "Unser Herr, auf Dich vertrauen wir, zu Dir wenden wir uns und zu Dir ist die Heimkehr. Unser Herr, mache uns nicht zur Versuchung für die Ungläubigen." },
  { ar: "اللَّهُمَّ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ", tr: "Allah'ım! Bütün işlerimi düzelt ve bir göz kırpma anı bile beni nefsimle başbaşa bırakma.", de: "O Allah, ordne alle meine Angelegenheiten und überlasse mich nicht für einen Augenblick meiner eigenen Seele." },
  { ar: "رَبَّنَا لَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ", tr: "Rabbimiz! Kalplerimizde iman edenlere karşı kin bırakma. Rabbimiz! Şüphesiz Sen çok şefkatli ve merhametlisin.", de: "Unser Herr, lass in unseren Herzen keinen Groll gegen die Gläubigen. Unser Herr, Du bist wahrlich voller Güte und Barmherzigkeit." },
  { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الرِّضَا بَعْدَ الْقَضَاءِ وَالْعَيْشَ الْهَنِيءَ بَعْدَ الْمَوْتِ", tr: "Allah'ım! Hükmünden sonra rıza ve ölümden sonra huzurlu bir hayat isterim.", de: "O Allah, ich bitte Dich um Zufriedenheit nach Deinem Urteil und ein friedliches Leben nach dem Tod." },
  { ar: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ", tr: "Rabbimiz! Rahmetin ve ilmin her şeyi kuşatmıştır. Tevbe edip yoluna uyanları bağışla ve onları cehennem azabından koru.", de: "Unser Herr, Deine Barmherzigkeit und Dein Wissen umfassen alles. Vergib denen, die bereuen und Deinen Weg befolgen, und bewahre sie vor der Strafe der Hölle." },
  { ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَلْبٍ لَا يَخْشَعُ وَمِنْ نَفْسٍ لَا تَشْبَعُ وَمِنْ عِلْمٍ لَا يَنْفَعُ", tr: "Allah'ım! Huşu duymayan kalpten, doymayan nefisten ve fayda vermeyen ilimden Sana sığınırım.", de: "O Allah, ich suche Zuflucht bei Dir vor einem Herzen, das nicht demütig ist, einer Seele, die nicht satt wird, und einem Wissen, das keinen Nutzen bringt." },
// 121. Gün — Kur’an (A’râf 89)
{  
  ar: "عَلَى اللَّهِ تَوَكَّلْنَا",
  tr: "Biz Allah’a tevekkül ettik.",
  de: "Auf Allah vertrauen wir."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي",
  tr: "Rabbim! Göğsüme genişlik ver, işimi kolaylaştır.",
  de: "Mein Herr, öffne mir meine Brust und erleichtere mir meine Angelegenheit."
},

{
    ar: "اللَّهُمَّ نَوِّرْ قَلْبِي",
  tr: "Allah’ım! Kalbimi nurlandır.",
  de: "O Allah, erleuchte mein Herz."
},

{
    ar: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ",
  tr: "Rabbim! Beni doğrulukla girdireceğin yere girdir.",
  de: "Mein Herr, lass mich aufrichtig eintreten."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا خَاشِعًا",
  tr: "Allah’ım! Huşu sahibi bir kalp isterim.",
  de: "O Allah, ich bitte Dich um ein demütiges Herz."
},


{
    ar: "رَبِّ ارْحَمْهُمَا",
  tr: "Rabbim! Onlara merhamet et.",
  de: "Mein Herr, erbarme Dich ihrer."
},

{
    ar: "اللَّهُمَّ نَوِّرْ بَصَرِي",
  tr: "Allah’ım! Gözümü nurlandır.",
  de: "O Allah, erleuchte meinen Blick."
},


{
    ar: "رَبِّ اغْفِرْ لِي وَلِأَخِي",
  tr: "Rabbim! Beni ve kardeşimi bağışla.",
  de: "Mein Herr, vergib mir und meinem Bruder."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{  
  ar: "رَبِّ اغْفِرْ وَارْحَمْ",
  tr: "Rabbim! Bağışla, merhamet et.",
  de: "Mein Herr, vergib und erbarme Dich."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
  tr: "Rabbimiz! Bize dünyada iyilik ver.",
  de: "Unser Herr, gib uns Gutes im Diesseits."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الصِّدْقِ",
  tr: "Allah’ım! Beni doğruluk ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Wahrhaftigkeit."
},

{
    ar: "وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ",
  tr: "Beni doğrulukla çıkaracağın yerden çıkar.",
  de: "Lass mich aufrichtig hinausgehen."
},

{
    ar: "اللَّهُمَّ نَوِّرْ صَدْرِي",
  tr: "Allah’ım! Göğsümü nurlandır.",
  de: "O Allah, erleuchte meine Brust."
},

{
    ar: "أَنتَ وَلِيُّنَا فَاغْفِرْ لَنَا",
  tr: "Sen bizim velimizsin. Bizi bağışla.",
  de: "Du bist unser Beschützer. Vergib uns."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رَوْحًا وَرَاحَةً",
  tr: "Allah’ım! Huzur ve ferahlık isterim.",
  de: "O Allah, ich bitte Dich um Ruhe und Erleichterung."
},

{
    ar: "رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي",
  tr: "Rabbimiz! Gizlediğimizi Sen bilirsin.",
  de: "Unser Herr, Du weißt, was wir verbergen."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي سَمْعِي",
  tr: "Allah’ım! İşitmemde nur isterim.",
  de: "O Allah, gib meinem Gehör Licht."
},

{
   ar: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا",
  tr: "Rabbimiz! Nurumuzu tamamla.",
  de: "Unser Herr, vollende unser Licht."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْقُرْآنِ",
  tr: "Allah’ım! Beni Kur’an ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Qurans."
},

{
    ar: "وَقُل رَّبِّ ارْحَمْهُمَا",
  tr: "De ki: Rabbim! Onlara merhamet et.",
  de: "Sprich: Mein Herr, erbarme Dich ihrer."
},

{
    ar: "اللَّهُمَّ نَوِّرْ وَجْهِي",
  tr: "Allah’ım! Yüzümü nurlandır.",
  de: "O Allah, erleuchte mein Gesicht."
},

{
    ar: "وَأَدْخِلْنَا فِي رَحْمَتِكَ",
  tr: "Bizi rahmetine dahil et.",
  de: "Nimm uns in Deine Barmherzigkeit auf."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا نَقِيًّا",
  tr: "Allah’ım! Tertemiz bir kalp isterim.",
  de: "O Allah, ich bitte Dich um ein reines Herz."
},

{  
  ar: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Rabbim! Bağışla, merhamet et. Merhametlilerin en hayırlısı Sensin.",
  de: "Mein Herr, vergib und erbarme Dich. Du bist der Beste der Barmherzigen."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي",
  tr: "Allah’ım! Kalbime nur ver.",
  de: "O Allah, gib meinem Herzen Licht."
},

{  
  ar: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ",
  tr: "Rabbim! Beni, anne-babamı ve müminleri bağışla.",
  de: "Mein Herr, vergib mir, meinen Eltern und den Gläubigen."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضًا بَعْدَ الْقَضَاءِ",
  tr: "Allah’ım! Hükmünden sonra rızanı isterim.",
  de: "O Allah, ich bitte Dich um Zufriedenheit nach Deinem Urteil."
},

{
    ar: "رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي",
  tr: "Rabbim! Göğsüme genişlik ver, işimi kolaylaştır.",
  de: "Mein Herr, öffne mir meine Brust und erleichtere mir meine Angelegenheit."
},

{
    ar: "اللَّهُمَّ نَوِّرْ سَمْعِي وَبَصَرِي",
  tr: "Allah’ım! İşitmemi ve görmemi nurlandır.",
  de: "O Allah, erleuchte mein Gehör und meinen Blick."
},

{
    ar: "فَاغْفِرْ لَنَا وَارْحَمْنَا",
  tr: "Bizi bağışla ve bize merhamet et.",
  de: "Vergib uns und erbarme Dich unser."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ صِدْقًا فِي الْقَوْلِ وَالْعَمَلِ",
  tr: "Allah’ım! Sözde ve amelde doğruluk isterim.",
  de: "O Allah, ich bitte Dich um Aufrichtigkeit in Wort und Tat."
},

{
    ar: "وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
  tr: "Bana katından yardımcı bir güç ver.",
  de: "Gib mir von Dir eine unterstützende Kraft."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِقَّةَ الْقَلْبِ",
  tr: "Allah’ım! Kalp yumuşaklığı isterim.",
  de: "O Allah, ich bitte Dich um Sanftheit des Herzens."
},

{  
  ar: "رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ",
  tr: "Rabbimiz! Gizlediğimizi de açıkladığımızı da Sen bilirsin.",
  de: "Unser Herr, Du weißt, was wir verbergen und was wir offenlegen."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "رَبِّ اغْفِرْ وَارْحَمْ",
  tr: "Rabbim! Bağışla, merhamet et.",
  de: "Mein Herr, vergib und erbarme Dich."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{  
  ar: "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا",
  tr: "Rabbimiz! Bize ağır yük yükleme.",
  de: "Unser Herr, lege uns keine schwere Last auf."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِقَّةَ الْقَلْبِ وَصِدْقَ اللِّسَانِ",
  tr: "Allah’ım! Kalp yumuşaklığı ve doğru bir dil isterim.",
  de: "O Allah, ich bitte Dich um Sanftheit des Herzens und Wahrhaftigkeit der Zunge."
},

{
    ar: "وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا",
  tr: "Eğer bizi bağışlamaz ve bize merhamet etmezsen...",
  de: "Wenn Du uns nicht vergibst und Dich unser nicht erbarmst..."
},

{
    ar: "اللَّهُمَّ نَوِّرْ قَلْبِي وَصَدْرِي",
  tr: "Allah’ım! Kalbimi ve göğsümü nurlandır.",
  de: "O Allah, erleuchte mein Herz und meine Brust."
},

{
    ar: "وَمِنْ ذُرِّيَّتِي",
  tr: "Soyumdan gelenleri de (namazı kılanlardan eyle).",
  de: "Und auch meine Nachkommen (zu Betenden mache)."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Glaubens."
},

{  
  ar: "وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Sen merhametlilerin en hayırlısısın.",
  de: "Du bist der Beste der Barmherzigen."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي النَّفْسِ",
  tr: "Allah’ım! Nefsimdeki kötülüklerden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel in meiner Seele."
},

{  
  ar: "وَارْحَمْنَا",
  tr: "Bize merhamet et.",
  de: "Erbarme Dich unser."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا يَهْدِينِي",
  tr: "Allah’ım! Bana hidayet edecek bir nur isterim.",
  de: "O Allah, ich bitte Dich um ein Licht, das mich leitet."
},

{  
  ar: "كَمَا رَبَّيَانِي صَغِيرًا",
  tr: "Onlar beni küçükken yetiştirdikleri gibi...",
  de: "Wie sie mich aufzogen, als ich klein war..."
},

{
    ar: "اللَّهُمَّ طَهِّرْ نَفْسِي",
  tr: "Allah’ım! Nefsimi temizle.",
  de: "O Allah, reinige meine Seele."
},

{  
  ar: "وَمَا نُعْلِنُ",
  tr: "Açıkladığımızı da (Sen bilirsin).",
  de: "Und was wir offenlegen."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{  
  ar: "رَبِّ اغْفِرْ",
  tr: "Rabbim! Bağışla.",
  de: "Mein Herr, vergib."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "أَنتَ وَلِيُّنَا",
  tr: "Sen bizim velimizsin.",
  de: "Du bist unser Beschützer."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رَوْحًا وَرَاحَةً",
  tr: "Allah’ım! Huzur ve ferahlık isterim.",
  de: "O Allah, ich bitte Dich um Ruhe und Erleichterung."
},

{
    ar: "رَبَّنَا إِنَّكَ تَعْلَمُ",
  tr: "Rabbimiz! Sen bilirsin.",
  de: "Unser Herr, Du weißt."
},

{
    ar: "اللَّهُمَّ نَوِّرْ وَجْهِي",
  tr: "Allah’ım! Yüzümü nurlandır.",
  de: "O Allah, erleuchte mein Gesicht."
},

{
    ar: "وَاغْفِرْ لَنَا",
  tr: "Bizi bağışla.",
  de: "Vergib uns."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْقُرْآنِ",
  tr: "Allah’ım! Beni Kur’an ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Qurans."
},

{
    ar: "وَقُل رَّبِّ ارْحَمْهُمَا",
  tr: "De ki: Rabbim! Onlara merhamet et.",
  de: "Sprich: Mein Herr, erbarme Dich ihrer."
},

{  
  ar: "اللَّهُمَّ نَوِّرْ صَدْرِي",
  tr: "Allah’ım! Göğsümü nurlandır.",
  de: "O Allah, erleuchte meine Brust."
},

{
    ar: "وَاغْفِرْ لِي",
  tr: "Beni bağışla.",
  de: "Vergib mir."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا سَلِيمًا",
  tr: "Allah’ım! Selim bir kalp isterim.",
  de: "O Allah, ich bitte Dich um ein reines Herz."
},

{  
  ar: "وَارْحَمْ",
  tr: "Merhamet et.",
  de: "Erbarme Dich."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي",
  tr: "Allah’ım! Nefsimin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel meiner Seele."
},

{
    ar: "مَا نُخْفِي وَمَا نُعْلِنُ",
  tr: "Gizlediğimizi de açıkladığımızı da (Sen bilirsin).",
  de: "Was wir verbergen und was wir offenlegen."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرِّضَا",
  tr: "Allah’ım! Beni rıza ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Zufriedenheit."
},

{
    ar: "فَاغْفِرْ لَنَا",
  tr: "Bizi bağışla.",
  de: "Vergib uns."
},

{  
  ar: "اللَّهُمَّ نَوِّرْ قَلْبِي",
  tr: "Allah’ım! Kalbimi nurlandır.",
  de: "O Allah, erleuchte mein Herz."
},

{  
  ar: "رَبَّنَا إِنَّكَ تَعْلَمُ",
  tr: "Rabbimiz! Sen bilirsin.",
  de: "Unser Herr, Du weißt."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رَوْحًا وَرَاحَةً",
  tr: "Allah’ım! Huzur ve ferahlık isterim.",
  de: "O Allah, ich bitte Dich um Ruhe und Erleichterung."
},

{  
  ar: "وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Sen merhametlilerin en hayırlısısın.",
  de: "Du bist der Beste der Barmherzigen."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "وَارْحَمْنَا",
  tr: "Bize merhamet et.",
  de: "Erbarme Dich unser."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "مَا نُخْفِي وَمَا نُعْلِنُ",
  tr: "Gizlediğimizi de açıkladığımızı da Sen bilirsin.",
  de: "Was wir verbergen und was wir offenlegen."
},

{  
  ar: "اللَّهُمَّ نَوِّرْ وَجْهِي وَقَلْبِي",
  tr: "Allah’ım! Yüzümü ve kalbimi nurlandır.",
  de: "O Allah, erleuchte mein Gesicht und mein Herz."
},

{
    ar: "رَبَّنَا لَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ",
  tr: "Rabbimiz! Gücümüzün yetmediği şeyleri bize yükleme.",
  de: "Unser Herr, belaste uns nicht mit dem, was wir nicht tragen können."
},

{  
  ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck des Glaubens."
},

{
    ar: "لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
  tr: "Ziyana uğrayanlardan oluruz.",
  de: "Wir würden zu den Verlierern gehören."
},

{
    ar: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ",
  tr: "Allah’ım! Kalbimi nifaktan temizle.",
  de: "O Allah, reinige mein Herz von Heuchelei."
},

{
    ar: "رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
  tr: "Rabbimiz! Duamı kabul buyur.",
  de: "Unser Herr, nimm mein Gebet an."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الصِّدْقِ",
  tr: "Allah’ım! Beni doğruluk ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Wahrhaftigkeit."
},

{
    ar: "رَبِّ اغْفِرْ",
  tr: "Rabbim! Bağışla.",
  de: "Mein Herr, vergib."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ",
  tr: "Allah’ım! Yaratılmış her canlının şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel aller Geschöpfe."
},

{
    ar: "وَارْحَمْنَا",
  tr: "Bize merhamet et.",
  de: "Erbarme Dich unser."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي طَرِيقِي",
  tr: "Allah’ım! Yoluma nur ver.",
  de: "O Allah, gib meinem Weg Licht."
},

{
    ar: "وَقُل رَّبِّ ارْحَمْهُمَا",
  tr: "De ki: Rabbim! Onlara merhamet et.",
  de: "Sprich: Mein Herr, erbarme Dich ihrer."
},

{  
  ar: "اللَّهُمَّ نَوِّرْ بَصَرِي وَسَمْعِي",
  tr: "Allah’ım! Gözümü ve kulağımı nurlandır.",
  de: "O Allah, erleuchte mein Gehör und meinen Blick."
},

{
    ar: "إِنَّكَ تَعْلَمُ مَا نُخْفِي",
  tr: "Şüphesiz gizlediğimizi Sen bilirsin.",
  de: "Du weißt, was wir verbergen."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي",
  tr: "Allah’ım! Nefsimin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel meiner Seele."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ قَلْبًا سَلِيمًا",
  tr: "Allah’ım! Selim bir kalp isterim.",
  de: "O Allah, ich bitte Dich um ein reines Herz."
},

{  
  ar: "اللَّهُمَّ نَوِّرْ وَجْهِي",
  tr: "Allah’ım! Yüzümü nurlandır.",
  de: "O Allah, erleuchte mein Gesicht."
},

{
    ar: "وَاغْفِرْ لَنَا",
  tr: "Bizi bağışla.",
  de: "Vergib uns."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْقُرْآنِ",
  tr: "Allah’ım! Beni Kur’an ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Qurans."
},

{
    ar: "كَمَا رَبَّيَانِي صَغِيرًا",
  tr: "Onlar beni küçükken yetiştirdikleri gibi...",
  de: "Wie sie mich aufzogen, als ich klein war..."
},

{
    ar: "اللَّهُمَّ نَوِّرْ صَدْرِي",
  tr: "Allah’ım! Göğsümü nurlandır.",
  de: "O Allah, erleuchte meine Brust."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِقَّةَ الْقَلْبِ",
  tr: "Allah’ım! Kalp yumuşaklığı isterim.",
  de: "O Allah, ich bitte Dich um Sanftheit des Herzens."
},

{  
  ar: "وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Sen merhametlilerin en hayırlısısın.",
  de: "Du bist der Beste der Barmherzigen."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرِّضَا",
  tr: "Allah’ım! Beni rıza ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Zufriedenheit."
},

{
    ar: "اللَّهُمَّ نَوِّرْ قَلْبِي",
  tr: "Allah’ım! Kalbimi nurlandır.",
  de: "O Allah, erleuchte mein Herz."
},

{
   ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رَوْحًا وَرَاحَةً",
  tr: "Allah’ım! Huzur ve ferahlık isterim.",
  de: "O Allah, ich bitte Dich um Ruhe und Erleichterung."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي",
  tr: "Allah’ım! Nefsimin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel meiner Seele."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "اللَّهُمَّ نَوِّرْ وَجْهِي وَقَلْبِي",
  tr: "Allah’ım! Yüzümü ve kalbimi nurlandır.",
  de: "O Allah, erleuchte mein Gesicht und mein Herz."
},

{
    ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا",
  tr: "Rabbimiz! Unutursak bizi sorumlu tutma.",
  de: "Unser Herr, belaste uns nicht, wenn wir vergessen."
},

{  
  ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck des Glaubens."
},

{
    ar: "اللَّهُمَّ طَهِّرْ قَلْبِي",
  tr: "Allah’ım! Kalbimi temizle.",
  de: "O Allah, reinige mein Herz."
},

{  
  ar: "وَمِنْ ذُرِّيَّتِي",
  tr: "Soyumdan gelenleri de (namazı kılanlardan eyle).",
  de: "Und auch meine Nachkommen (zu Betenden mache)."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Glaubens."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ",
  tr: "Allah’ım! Yaratılmış her canlının şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel aller Geschöpfe."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي طَرِيقِي",
  tr: "Allah’ım! Yoluma nur ver.",
  de: "O Allah, gib meinem Weg Licht."
},

{
    ar: "رَبَّنَا لَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
  tr: "Rabbimiz! Bizden öncekilere yüklediğin gibi bize ağır yük yükleme.",
  de: "Unser Herr, lege uns keine Last auf wie denen vor uns."
},

{
    ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الصَّالِحِينَ",
  tr: "Allah’ım! Beni salih kullarının ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck der Rechtschaffenen."
},

{  
  ar: "اللَّهُمَّ طَهِّرْ نَفْسِي وَقَلْبِي",
  tr: "Allah’ım! Nefsimi ve kalbimi temizle.",
  de: "O Allah, reinige meine Seele und mein Herz."
},

{  
  ar: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ",
  tr: "Rabbim! Beni namazı dosdoğru kılanlardan eyle.",
  de: "Mein Herr, mache mich zu denen, die das Gebet verrichten."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْخَيْرِ",
  tr: "Allah’ım! Beni hayır ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Guten."
},

{
  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي النَّفْسِ",
  tr: "Allah’ım! Nefsimdeki kötülüklerden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel in meiner Seele."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي",
  tr: "Allah’ım! Kalbime nur ver.",
  de: "O Allah, gib meinem Herzen Licht."
},

{
    ar: "اللَّهُمَّ نَوِّرْ بَصَرِي",
  tr: "Allah’ım! Gözümü nurlandır.",
  de: "O Allah, erleuchte meinen Blick."
},

{
    ar: "وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Sen merhametlilerin en hayırlısısın.",
  de: "Du bist der Beste der Barmherzigen."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "اللَّهُمَّ نَوِّرْ وَجْهِي",
  tr: "Allah’ım! Yüzümü nurlandır.",
  de: "O Allah, erleuchte mein Gesicht."
},

{
    ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا",
  tr: "Rabbimiz! Unutursak bizi sorumlu tutma.",
  de: "Unser Herr, belaste uns nicht, wenn wir vergessen."
},

{
    ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck des Glaubens."
},

{  
  ar: "ظَلَمْنَا أَنْفُسَنَا",
  tr: "Biz kendimize zulmettik.",
  de: "Wir haben uns selbst Unrecht getan."
},

{
    ar: "اللَّهُمَّ طَهِّرْ قَلْبِي",
  tr: "Allah’ım! Kalbimi temizle.",
  de: "O Allah, reinige mein Herz."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Glaubens."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ",
  tr: "Allah’ım! Yaratılmış her canlının şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel aller Geschöpfe."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي طَرِيقِي",
  tr: "Allah’ım! Yoluma nur ver.",
  de: "O Allah, gib meinem Weg Licht."
},

{  
  ar: "رَبَّنَا لَا تَحْمِلْ عَلَيْنَا إِصْرًا",
  tr: "Rabbimiz! Bize ağır yük yükleme.",
  de: "Unser Herr, lege uns keine schwere Last auf."
},

{
    ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الصَّالِحِينَ",
  tr: "Allah’ım! Beni salih kullarının ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck der Rechtschaffenen."
},

{  
  ar: "اللَّهُمَّ طَهِّرْ نَفْسِي",
  tr: "Allah’ım! Nefsimi temizle.",
  de: "O Allah, reinige meine Seele."
},

{  
  ar: "رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
  tr: "Rabbimiz! Duamı kabul buyur.",
  de: "Unser Herr, nimm mein Gebet an."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الصِّدْقِ",
  tr: "Allah’ım! Beni doğruluk ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Wahrhaftigkeit."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي النَّفْسِ",
  tr: "Allah’ım! Nefsimdeki kötülüklerden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel in meiner Seele."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي",
  tr: "Allah’ım! Kalbime nur ver.",
  de: "O Allah, gib meinem Herzen Licht."
},

{  
  ar: "إِنَّكَ تَعْلَمُ مَا نُخْفِي",
  tr: "Şüphesiz gizlediğimizi Sen bilirsin.",
  de: "Du weißt, was wir verbergen."
},

{
    ar: "اللَّهُمَّ نَوِّرْ بَصَرِي وَقَلْبِي",
  tr: "Allah’ım! Gözümü ve kalbimi nurlandır.",
  de: "O Allah, erleuchte meinen Blick und mein Herz."
},

{  
  ar: "وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Sen merhametlilerin en hayırlısısın.",
  de: "Du bist der Beste der Barmherzigen."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "اللَّهُمَّ نَوِّرْ وَجْهِي وَقَلْبِي",
  tr: "Allah’ım! Yüzümü ve kalbimi nurlandır.",
  de: "O Allah, erleuchte mein Gesicht und mein Herz."
},

{
    ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
  tr: "Rabbimiz! Unutur veya yanılırsak bizi sorumlu tutma.",
  de: "Unser Herr, belaste uns nicht, wenn wir vergessen oder einen Fehler machen."
},

{
    ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck des Glaubens."
},

{  
  ar: "وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا",
  tr: "Eğer bizi bağışlamaz ve bize merhamet etmezsen...",
  de: "Wenn Du uns nicht vergibst und Dich unser nicht erbarmst..."
},

{
    ar: "اللَّهُمَّ طَهِّرْ قَلْبِي وَنَفْسِي",
  tr: "Allah’ım! Kalbimi ve nefsimi temizle.",
  de: "O Allah, reinige mein Herz und meine Seele."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْخَيْرِ",
  tr: "Allah’ım! Beni hayır ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Guten."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي",
  tr: "Allah’ım! Nefsimin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel meiner Seele."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي",
  tr: "Allah’ım! Kalbime nur ver.",
  de: "O Allah, gib meinem Herzen Licht."
},

{  
  ar: "إِنَّكَ تَعْلَمُ مَا نُخْفِي",
  tr: "Şüphesiz gizlediğimizi Sen bilirsin.",
  de: "Du weißt, was wir verbergen."
},


{  
  ar: "وَأَنتَ خَيْرُ الرَّاحِمِينَ",
  tr: "Sen merhametlilerin en hayırlısısın.",
  de: "Du bist der Beste der Barmherzigen."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
   ar: "اللَّهُمَّ نَوِّرْ وَجْهِي",
  tr: "Allah’ım! Yüzümü nurlandır.",
  de: "O Allah, erleuchte mein Gesicht."
},

{
    ar: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا",
  tr: "Rabbimiz! Unutursak bizi sorumlu tutma.",
  de: "Unser Herr, belaste uns nicht, wenn wir vergessen."
},

{  
  ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck des Glaubens."
},

{
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Glaubens."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ",
  tr: "Allah’ım! Yaratılmış her canlının şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel aller Geschöpfe."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي طَرِيقِي",
  tr: "Allah’ım! Yoluma nur ver.",
  de: "O Allah, gib meinem Weg Licht."
},

{  
  ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الصَّالِحِينَ",
  tr: "Allah’ım! Beni salih kullarının ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck der Rechtschaffenen."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي النَّفْسِ",
  tr: "Allah’ım! Nefsimdeki kötülüklerden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel in meiner Seele."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي قَلْبِي",
  tr: "Allah’ım! Kalbime nur ver.",
  de: "O Allah, gib meinem Herzen Licht."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الرَّحْمَةِ",
  tr: "Allah’ım! Beni merhamet ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen der Barmherzigkeit."
},

{  
  ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ",
  tr: "Allah’ım! Yaptığım kötülüklerin şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel dessen, was ich getan habe."
},

{
    ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ النُّورِ",
  tr: "Allah’ım! Beni nur ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Lichts."
},

{
    ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck des Glaubens."
},

{  
  ar: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْإِيمَانِ",
  tr: "Allah’ım! Beni iman ehli kullarından eyle.",
  de: "O Allah, mache mich zu den Menschen des Glaubens."
},

{
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ",
  tr: "Allah’ım! Yaratılmış her canlının şerrinden Sana sığınırım.",
  de: "O Allah, ich suche Zuflucht bei Dir vor dem Übel aller Geschöpfe."
},

{
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نُورًا فِي طَرِيقِي",
  tr: "Allah’ım! Yoluma nur ver.",
  de: "O Allah, gib meinem Weg Licht."
},

{  
  ar: "اللَّهُمَّ زَيِّنِّي بِزِينَةِ الصَّالِحِينَ",
  tr: "Allah’ım! Beni salih kullarının ziynetiyle süsle.",
  de: "O Allah, schmücke mich mit dem Schmuck der Rechtschaffenen."
},

{
    ar: "وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
  tr: "Eğer bizi bağışlamaz ve bize merhamet etmezsen, ziyana uğrayanlardan oluruz.",
  de: "Wenn Du uns nicht vergibst und Dich unser nicht erbarmst, werden wir zu den Verlierern gehören."
}
];


