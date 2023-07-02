const hre = require("hardhat");

async function getbalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  console.log(" my balance is:- "+hre.ethers.utils.formatEther(balance));
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const deployeraddress = deployer.address;  

  const contractFactory = await hre.ethers.getContractFactory("MovieRatings");
  const contract = await contractFactory.deploy();
  
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  
  await getbalance(deployeraddress);

  await contract.connect(deployer).rateMovie(1, "nice movie", 5);
  await contract.connect(deployer).rateMovie(1, "best hahahaha", 10);
  
  console.log("Movie rating is: ");
  const Movierating = await contract.connect(deployer).getMovieRating(1);
  console.log(Movierating);

  console.log("Movie Review is: ");
  const MovieReview = await contract.GetMovieReviews(1);
  console.log(MovieReview);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
