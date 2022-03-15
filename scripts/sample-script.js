
const { ethers } = require("hardhat");

async function main() {
  const [user1, user2] = await ethers.getSigners();

  const NaughtCoin_Address = '0xC2c3980aa449d5F4Bb5Dbcf67Ac05000d4eE9aCa';

  const NaughtCoin = await ethers.getContractAt("NaughtCoin", NaughtCoin_Address);

  console.log(`User1 balance: ${ethers.utils.formatEther(await NaughtCoin.balanceOf(user1.address))}`);
  console.log(`User2 balance: ${ethers.utils.formatEther(await NaughtCoin.balanceOf(user2.address))}\n`);

  let tx = await NaughtCoin.approve(user2.address, ethers.utils.parseUnits('1000000'));
  await tx.wait(1);

  tx = await NaughtCoin.connect(user2).transferFrom(user1.address, user2.address, ethers.utils.parseUnits('1000000'));
  await tx.wait(1);

  
  console.log(`User1 balance: ${ethers.utils.formatEther(await NaughtCoin.balanceOf(user1.address))}`);
  console.log(`User2 balance: ${ethers.utils.formatEther(await NaughtCoin.balanceOf(user2.address))}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
