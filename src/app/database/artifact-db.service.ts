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
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 2,
      name: 'Süleymaniye Cami',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 3,
      name: 'Çeşme 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 4,
      name: 'Çeşme 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 5,
      name: 'Hamam 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 6,
      name: 'Hamam 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 7,
      name: 'Medrese 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 8,
      name: 'Medrese 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 9,
      name: 'Medrese 3',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 1,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 10,
      name: 'Fatih Camii',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 11,
      name: 'Süleymaniye Cami',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 1,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 12,
      name: 'Çeşme 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 13,
      name: 'Çeşme 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 2,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 14,
      name: 'Hamam 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 15,
      name: 'Hamam 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 3,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 16,
      name: 'Medrese 1',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 17,
      name: 'Medrese 2',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
    {
      id: 18,
      name: 'Medrese 3',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
      artifactTypeId: 4,
      epitaph: 'Anadolu’da ilk imar hareketleri, Türkmen devletlerinden Danişmendliler, Artukoğulları, Saltuklular, Mengücükler zamanında başlamış olmakla beraber, savaşlar yüzünden devrin eserlerinin çoğu harap olmuştur. Sürekli savaş hali ve iç çekişmeler siyasi ve sosyal hayatın yanında sanat ve kültür alanında da tahribatı beraberinde getirmiştir. ',
      histPeriodId: 2,
      epitaphImagePath: 'http://sanattarihiplatformu.com/files/kitabe-2.jpg',
    },
  ];
}
