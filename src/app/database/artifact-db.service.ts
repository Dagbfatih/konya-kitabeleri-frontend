import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';
import { Artifact } from '../models/entities/artifact';
import { ItemResponseModel } from '../core/models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../core/models/responseModels/ListResponseModel';
import { ResponseModel } from '../core/models/responseModels/responseModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtifactDbService extends DbServiceRepositoryBase<Artifact> {
  data: Artifact[] = [
    {
      id: 1,
      name: 'Fatih Cami',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 2,
      name: 'Süleymaniye Cami',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 3,
      name: 'Çeşme 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 4,
      name: 'Çeşme 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 5,
      name: 'Hamam 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 6,
      name: 'Hamam 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 7,
      name: 'Medrese 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 8,
      name: 'Medrese 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 9,
      name: 'Medrese 3',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 10,
      name: 'Fatih Camii',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 11,
      name: 'Süleymaniye Cami',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 12,
      name: 'Çeşme 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 13,
      name: 'Çeşme 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 14,
      name: 'Hamam 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 15,
      name: 'Hamam 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 16,
      name: 'Medrese 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 17,
      name: 'Medrese 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
    {
      id: 18,
      name: 'Medrese 3',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph:
        'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
      originalEpitaph:
        'La-zaler silsiletü saltantihi ila intihai mütesselsileti silsileti’d-devran ve ervahu eslafihi mütenezziheran fi ravzati’r-riyazati enşe’e haze’l-cami’a’r-refi’al- bünyane’l bedayi’a’l-meyyale’s-şahikıyyete’l-abkara menen li’n-nasi fi ibadeti’l-meliki’l ma’budi mine’l-akifine ve’l-kaimine ve’r-raki’s-sucudi ve kaneti’l-bidayetü fi evahiri cumadi’l-ula li-sene seb’a ve hamsin ve tis’amie ve n-nihayetü fi evahiri zi’l-hicceti’l- haramı es-sene erba’a ve sittin ve tis’a mie.',
    },
  ];
}
