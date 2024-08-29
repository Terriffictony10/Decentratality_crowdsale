import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { ethers } from 'ethers'
import Navigation from "./Navigation";
import Info from './Info';

import TOKEN_ABI from '../abis/Token.json'
import CROWDSALE_ABI from '../abis/Crowdsale.json'

import config from '../config.json'
function App() {
	const [provider, setProvider] = useState(null)
	const [crowdsale, setCrowdsale] = useState(null)
	const [account, setAccount] = useState(null)

	const [isLoading, setIsLoading] = useState(true)

	const loadBlockchainData = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		
		setProvider(provider)

		const { chainId } = await provider.getNetwork()

		const token = new ethers.Contract(config[chainId].token.address, TOKEN_ABI, provider )

		const crowdsale = new ethers.Contract(config[chainId].crowdsale.address, CROWDSALE_ABI, provider )
		setCrowdsale(crowdsale)
		console.log(token)
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		const account = ethers.utils.getAddress(accounts[0])
		
		setAccount(account)

		const accountBalance = ethers.utils.formatUnits(await token.balanceOf(account))
		console.log(accountBalance)

		setIsLoading(false)
	}
	useEffect(() => {
		if(isLoading){
		loadBlockchainData()
	}
	}, [isLoading]);
	return(
		<Container>
			<Navigation />
			{account && (
				<Info account={account} />
			)}
			
		</Container>
	)
}

export default App;