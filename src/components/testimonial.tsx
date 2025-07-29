'use client'

// const testimonials = [
// 	{
// 		name: 'Alice Johnson',
// 		title: 'Open Source Maintainer',
// 		text: 'FlexReadme made my project docs look so professional! The AI suggestions are spot on.',
// 		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
// 	},
// 	{
// 		name: 'Brian Lee',
// 		title: 'Full Stack Developer',
// 		text: 'The live editor and bento layouts are a game changer for my workflow.',
// 		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
// 	},
// 	{
// 		name: 'Priya Patel',
// 		title: 'Technical Writer',
// 		text: 'I love the premium themes and how easy it is to customize everything.',
// 		avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
// 	},
// 	{
// 		name: 'Carlos Rivera',
// 		title: 'DevOps Engineer',
// 		text: 'Responsive design preview is so helpful. My docs look great everywhere!',
// 		avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
// 	},
// 	{
// 		name: 'Sofia Kim',
// 		title: 'Product Manager',
// 		text: 'The bento grid makes our docs stand out. Highly recommended!',
// 		avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
// 	},
// ]

// function chunkArray<T>(arr: T[], size: number): T[][] {
// 	const res: T[][] = []
// 	for (let i = 0; i < arr.length; i += size) {
// 		res.push(arr.slice(i, i + size))
// 	}
// 	return res
// }

export default function Testimonal() {
	// const ROWS = 3
	// const COLS = 3

	// const repeated = Array(3).fill(testimonials).flat()
	// const gridChunks = chunkArray(repeated, COLS)
	// const displayRows = gridChunks.slice(0, ROWS)
	
	// const wallCards = displayRows.map((row) => [...row, ...row])

	return (
		<></>
// 		<section className="relative py-20 bg-background/80 overflow-hidden">
// 			<div className="container max-w-6xl mx-auto px-4 relative z-10">
// 				<div className="text-center mb-10">
				
// 					<h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-6 mb-2 text-white">
// 						What people <span className="text-primary">are saying</span> 
// 					</h2>
// 				</div>
// 				<div className="overflow-x-hidden custom-hide-scrollbar relative">
					
// 					<div
// 						className="pointer-events-none absolute inset-y-0 left-0 w-16 z-20"
// 						style={{
// 							background:
// 								'linear-gradient(to right, var(--background), transparent 80%)',
// 						}}
// 					/>
// 					<div
// 						className="pointer-events-none absolute inset-y-0 right-0 w-16 z-20"
// 						style={{
// 							background:
// 								'linear-gradient(to left, var(--background), transparent 80%)',
// 						}}
// 					/>
// 					<div className="flex flex-col gap-3 w-max" style={{ minWidth: 0 }}>
// 						{wallCards.map((row, rowIdx) => (
// 							<div
// 								key={rowIdx}
// 								className={
// 									`flex gap-8 min-w-full ` +
// 									(rowIdx % 2 === 0
// 										? 'animate-wall-scroll-left'
// 										: 'animate-wall-scroll-right')
// 								}
// 								style={{ animationDelay: `${-rowIdx * 6}s` }}
// 							>
// 								{row.map((t, i) => (
// 									<div
// 										key={i + '-' + rowIdx}
// 										className="min-w-[320px] max-w-xs bg-card border border-border/60 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 min-h-[220px]"
// 									>
// 										<img
// 											src={t.avatar}
// 											alt={t.name}
// 											className="w-14 h-14 rounded-full border-2 border-primary mb-3 shadow"
// 										/>
// 										<div className="text-lg font-semibold text-foreground font-mono mb-1">
// 											{t.name}
// 										</div>
// 										<div className="text-xs text-muted-foreground font-mono mb-2">
// 											{t.title}
// 										</div>
// 										<div className="text-base text-muted-foreground font-mono text-center">
// 											“{t.text}”
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						))}
// 					</div>
// 					<style>{`
// .custom-hide-scrollbar {
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none; /* IE and Edge */
// }
// .custom-hide-scrollbar::-webkit-scrollbar {
//   display: none; /* Chrome, Safari, Opera */
// }
// @keyframes wall-scroll-left {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// }
// @keyframes wall-scroll-right {
//   0% { transform: translateX(-50%); }
//   100% { transform: translateX(0); }
// }
// .animate-wall-scroll-left {
//   animation: wall-scroll-left 40s linear infinite;
// }
// .animate-wall-scroll-right {
//   animation: wall-scroll-right 40s linear infinite;
// }
// `}</style>
// 				</div>
// 			</div>
// 		</section>
	)
}