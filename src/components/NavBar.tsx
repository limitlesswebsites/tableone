
import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import InvestmentDialog from './funding/InvestmentDialog';
import RedirectDialog from './funding/RedirectDialog';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
	const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
	const [isRedirecting, setIsRedirecting] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { user } = useAuth();

	const handleDownloadClick = () => {
		window.open("https://apps.apple.com/us/app/tableone-reservations/id6448799631", '_blank');
	};

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrolled]);

	useEffect(() => {
		function smoothScroll(targetId) {
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
			  targetElement.scrollIntoView({ behavior: 'smooth' });
			}
		}

		async function handle() {
			const path = window.location.href;

			if (path.includes("videoStory")) {
				smoothScroll('videoStory')
			}
		}

		handle()
	},[])

	return (<>
		<InvestmentDialog
			isOpen={isInvestmentDialogOpen}
			onOpenChange={setIsInvestmentDialogOpen}
			setIsOpen={setIsInvestmentDialogOpen}
		/>
		
		<RedirectDialog isOpen={isRedirecting} />

		<nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-2.5 transition-all duration-500 ${scrolled ? 'glass backdrop-blur-lg bg-black/30 border-b border-white/5' : 'bg-transparent'
			}`}>
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<img
						src="/lovable-uploads/4329a76b-4372-4945-8827-e8e0265d3913.png"
						alt="TableOne Logo"
						className="h-4 md:h-5 transition-all duration-300 hover:opacity-80"
					/>
				</div>
				<div className="hidden md:flex space-x-12">
					<HashLink smooth to="/#metrics" className="text-xs font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1 font-sfpro">
						Metrics
						<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
					</HashLink>
					<HashLink smooth to="#roadmap" className="text-xs font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1 font-sfpro">
						Roadmap
						<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
					</HashLink>
					<HashLink smooth to="#expansion" className="text-xs font-medium text-white/80 hover:text-white transition-all duration-300 relative group px-1 font-sfpro">
						Expansion
						<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
					</HashLink>
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={handleDownloadClick}
						className="px-4 py-1.5 text-xs rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 font-sfpro"
					>
						Download now
					</button>
				</div>
			</div>
		</nav>
	</>
	);
};

export default NavBar;
