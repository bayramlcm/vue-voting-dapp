const truffleAssert = require('truffle-assertions');
const VotingApp = artifacts.require("VotingApp");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("VotingApp", (accounts) => {
  it("should assert true", async function () {
    await VotingApp.deployed();
    return assert.isTrue(true);
  });

  // it("Kullanıcı kayıtlı mı?", async () => {
  //   const instance = await VotingApp.deployed();
  //   const ownerRegistered = await instance.isRegistered(accounts[0]);
  //   const userRegistered = await instance.isRegistered(accounts[1]);
  //   assert.equal(ownerRegistered, true);
  //   assert.equal(userRegistered, false);
  // })

  it("Kayıt ol", async () => {
    const instance = await VotingApp.deployed();
    // Admin ile kayıt olmayı dene
    await truffleAssert.reverts(instance.register("Bayram ALAÇAM", { from: accounts[0] }), "ERR_IS_REGISTERED");
    // User ile kayıt olmayı dene
    await instance.register("Emirhan ALAÇAM", { from: accounts[1] });
  })

  it("Kullanıcı kendi ismini değiştirir", async () => {
    const instance = await VotingApp.deployed();
    // Account 0 isim değiştirmesi
    await instance.setName("Bayram ALAÇAM", { from: accounts[0] })
    // Account 1 isim değiştirmesi
    await instance.setName("Ahmet ALAÇAM", { from: accounts[1] })
    // Account 3 Var olmayan hesap ile isim değiştirilmesi
    await truffleAssert.reverts(instance.setName("Hülya ALAÇAM", { from: accounts[3] }), "ERR_SET_NAME_1");
  })

  it("Kullanıcı bilgisini getirir", async () => {
    const instance = await VotingApp.deployed();
    // Account 0 admin  hesap bilgisini getir
    const account0 = await instance.getUser(accounts[0]);
    assert.equal(account0.name, "Bayram ALAÇAM")
    assert.equal(account0.roleLevel, 10);
    // Account 1 normal kullanıcı hesap bilgisini getir
    const account1 = await instance.getUser(accounts[1]);
    assert.equal(account1.name, "Ahmet ALAÇAM")
    assert.equal(account1.roleLevel, 1);
    // Account 2 olmayan hesap bilgisini getirme
    await truffleAssert.reverts(instance.getUser(accounts[3]), "ERR_GET_MY_PROFILE");
  })

  // Kullanıcı yetkisini değiştir

  it("Tüm kullanıcıları getir", async () => {
    const instance = await VotingApp.deployed();
    // Tüm kullanıcı sayılarına göre kontrol et
    const users = await instance.getUsers();
    assert.equal(users.length, 2);
    assert.equal(users[0], accounts[0]);
    assert.equal(users[1], accounts[1]);
  });

  it("Admin ve normal kullanıcı sayılarını getir", async () => {
    const instance = await VotingApp.deployed();
    // Admin ve normal user sayılarına göre kontrol et
    const [adminCount, userCount] = await instance.getAdminAndUserCount();
    assert.equal(adminCount, 1);
    assert.equal(userCount, 1);
  });

  it("Oylama oluştur", async () => {
    const instance = await VotingApp.deployed();
    const yesterDay = Math.floor(+new Date(new Date().setDate(new Date().getDate() - 1)) / 1000);
    const tomorrowDay = Math.floor(+new Date(new Date().setDate(new Date().getDate() + 1)) / 1000);
    // Tarihi yarın olacak şekilde oylama oluştur (1)
    await instance.createVote("Konu 1", "Detay 1", tomorrowDay, { from: accounts[0] });
    // Tarihi yarın olacak şekilde oylama oluştur (2)
    await instance.createVote("Konu 1", "Detay 1", tomorrowDay, { from: accounts[0] });
    // Tarihi dün olacak şekilde oylama oluştur (hata döndürür)
    await truffleAssert.reverts(instance.createVote("Konu 2", "Detay 2", yesterDay, { from: accounts[0] }), "ERR_CREATE_VOTE");
    // Normal kullanıcı oylama oluşturmayı dener (hata döndürür)
    await truffleAssert.reverts(instance.createVote("Konu 3", "Detay 3", tomorrowDay, { from: accounts[1] }), "ERR_ONLY_ADMIN_ROLE");
  })

  it("Bir oylamanın bilgisini getirir", async () => {
    const instance = await VotingApp.deployed();
    // Oluşturulan oylamanın bilgileri kontrol eder
    const vote = await instance.getVote(1);
    assert.equal(vote.id, 1);
    assert.equal(vote.subject, "Konu 1");
    assert.equal(vote.detail, "Detay 1");
    assert.equal(vote.status, 1);
  })

  it("Bir oylamanın durumunu değiştirir", async () => {
    const instance = await VotingApp.deployed();
    // Yetkisiz durum değiştirmeyi dene (hata döndürür)
    await truffleAssert.reverts(instance.setVoteStatus(1, 1, { from: accounts[1] }), "ERR_ONLY_ADMIN_ROLE");
    // Farklı durum kodu göndererek kontrol et (hata döndürür)
    await truffleAssert.reverts(instance.setVoteStatus(1, 3, { from: accounts[0] }), "ERR_SET_VOTE_STATUS_1");
    // Farklı bir oylama numarası göndererek kontrol et (hata döndürür)
    await truffleAssert.reverts(instance.setVoteStatus(9, 1, { from: accounts[0] }), "ERR_SET_VOTE_STATUS_2");
    // Oylamayı dondur
    await instance.setVoteStatus(1, 2, { from: accounts[0] });
    // Oylamayı tekrar aç
    await instance.setVoteStatus(1, 1, { from: accounts[0] });
    // Oylamayı kapat
    await instance.setVoteStatus(1, 0, { from: accounts[0] });
    // Kapalı olan oylamayı tekrar aç (hata döndürür)
    await truffleAssert.reverts(instance.setVoteStatus(1, 1, { from: accounts[0] }), "ERR_SET_VOTE_STATUS_3");
  })

  it("Oy kullan", async () => {
    const instance = await VotingApp.deployed();
    // Kayıtlı olmayan biri oy kullanırsa (hata döndürür)
    await truffleAssert.reverts(instance.useVote(2, true, { from: accounts[2] }), "ERR_USE_VOTE_1");
    // Daha önce oluşturulmamış bir oylamaya oy kullanılamaz (hata döndürür)
    await truffleAssert.reverts(instance.useVote(9, true, { from: accounts[0] }), "ERR_USE_VOTE_2");
    // Admin oy kullanır
    await instance.useVote(2, true, { from: accounts[0] })
    // Normal kullanıcı oy kullanır
    await instance.useVote(2, false, { from: accounts[1] })
  });

  it("Kullanıcının kullandığı oylar", async () => {
    const instance = await VotingApp.deployed();
    // Kayıtlı olmayan birinin kullandığı oyları getir (boş yanıt döner)
    const usedVoteIds1 = await instance.usedVoteList(accounts[2]);
    assert.equal(usedVoteIds1.length, 0);
    // Admin kullandığı oyları getir
    const usedVoteIds2 = await instance.usedVoteList(accounts[0]);
    assert.equal(usedVoteIds2.length, 1);
    // Normal kullanıcının oylarını getir
    const usedVoteIds3 = await instance.usedVoteList(accounts[1]);
    assert.equal(usedVoteIds3.length, 1);
  })

  it("Kullanıcının kullandığı oy sayısı", async () => {
    const instance = await VotingApp.deployed();
    // Kayıtlı olmayan birinin kullandığı oyları sayısı (0 yanıtı döner)
    const usedVoteCount1 = await instance.userUsedVoteCount(accounts[2]);
    assert.equal(usedVoteCount1, 0);
    // Admin kullandığı oy sayısı
    const usedVoteCount2 = await instance.userUsedVoteCount(accounts[0]);
    assert.equal(usedVoteCount2, 1);
    // Normal kullanıcının kullandığı oy sayısı
    const usedVoteCount3 = await instance.userUsedVoteCount(accounts[1]);
    assert.equal(usedVoteCount3, 1);
  })

  it("Kullanıcının kullanmadığı oy sayısı", async () => {
    const instance = await VotingApp.deployed();
    // Kayıtlı olmayan birinin kullanmadığı oyları sayısı (toplam oylama adeti kadar döner)
    const unusedVoteCount1 = await instance.userUnusedVoteCount(accounts[2]);
    assert.equal(unusedVoteCount1, 2);
    // Admin kullanmadığı oy sayısı
    const unusedVoteCount2 = await instance.userUnusedVoteCount(accounts[0]);
    assert.equal(unusedVoteCount2, 1);
    // Normal kullanıcının kullanmadığı oy sayısı
    const unusedVoteCount3 = await instance.userUnusedVoteCount(accounts[1]);
    assert.equal(unusedVoteCount3, 1);
  })

  it("Kullanıcının kullandığı oy bilgisi", async () => {
    const instance = await VotingApp.deployed();
    // Admin kullandığı oy bilgisi
    const vote1 = await instance.usedVote(1);
    assert.equal(vote1.id, 2);
    assert.equal(vote1.vote, true);
    // Normal kullanıcının oy bilgisi
    const vote2 = await instance.usedVote(2);
    assert.equal(vote2.id, 2);
    assert.equal(vote2.vote, false);
    // yanlış oy bilgisi almak (hata döner)
    await truffleAssert.reverts(instance.usedVote(3), "ERR_USED_VOTE");
  })

  it("Oylamanın Evet / Hayır olarak kullanılan oy sayısını getir", async () => {
    const instance = await VotingApp.deployed();
    // Evet için yanlış oy bilgisinden sayıyı al (hata döndürür)
    await truffleAssert.reverts(instance.usedVoteYes(3), "ERR_USED_VOTES_YES");
    // Hayır için yanlış oy bilgisinden sayıyı al (hata döndürür)
    await truffleAssert.reverts(instance.usedVoteNo(3), "ERR_USED_VOTES_NO");
    // Evet için kullanılan toplam oy
    const voteYes = await instance.usedVoteYes(2);
    assert.equal(voteYes, 1);
    // Hayır için kullanılan toplam oy
    const voteNo = await instance.usedVoteYes(2);
    assert.equal(voteNo, 1);
    // Başka bir oylamada evet için kullanılan toplam oy
    const voteYes2 = await instance.usedVoteYes(1);
    assert.equal(voteYes2, 0);
    // Başka bir oylamada hayır için kullanılan toplam oy
    const voteNo2 = await instance.usedVoteYes(1);
    assert.equal(voteNo2, 0);
  })

  it("Kullanıcının yetki rolünü değiştir", async () => {
    const instance = await VotingApp.deployed();
    // Normal kullanıcı tarafından yetki verilmesi (hata döndürür)
    await truffleAssert.reverts(instance.setUserRole(accounts[1], 10, { from: accounts[1] }), "ERR_ONLY_ADMIN_ROLE");
    // Sistem sahibinin kendi yetkisini değiştirmesi (hata döndürür)
    await truffleAssert.reverts(instance.setUserRole(accounts[0], 1, { from: accounts[0] }), "ERR_SET_USER_ROLE_1");
    // Admin tarafından normal kullanıcının yetki değişimi
    await instance.setUserRole(accounts[1], 10, { from: accounts[0] });
    // Kullanıcının yetkisinin değiştiğini teyit eder
    const user = await instance.getUser(accounts[1]);
    assert.equal(user.name, "Ahmet ALAÇAM");
    assert.equal(user.roleLevel, 10);
  });

});
