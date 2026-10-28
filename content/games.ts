/**
 * The elementary games: one per workbook week that has one, on the venture
 * engine (lib/engine). Each is reached at /play/<grade>/<week>, the address a
 * printed line on that week's page gives. Nothing is stored; nothing is
 * collected; no login.
 *
 * Week numbers and titles are the book's own, from its week() calls in the
 * curriculum repository. Only the enterprise books have games: the financial
 * literacy, mathematics and science books do not sell anything.
 */
export type Game = {
  grade: 'g4' | 'g5' | 'g6';
  week: number;
  /** The week's title, exactly as the book prints it. */
  title: string;
  /** The week's subtitle, exactly as the book prints it. */
  line: string;
  /** What the game asks the student to do, in one sentence. */
  play: string;
};

export const BOOKS: Record<Game['grade'], { name: string; grade: string; pdf: string; guide: string }> = {
  g4: { name: 'The Venture Year', grade: 'Grade 4', pdf: '/downloads/venture-year-grade4.pdf', guide: '/downloads/venture-year-teacher-guide.html' },
  g5: { name: 'The Numbers Year', grade: 'Grade 5', pdf: '/downloads/numbers-year-grade5.pdf', guide: '/downloads/numbers-year-teacher-guide.html' },
  g6: { name: 'The Market Year', grade: 'Grade 6', pdf: '/downloads/market-year-grade6.pdf', guide: '/downloads/market-year-grade6-teacher-guide.html' },
};

export const GAMES: Game[] = [
  { grade: 'g4', week: 7, title: 'Where the Money Goes', line: 'The money a customer hands you does not stay yours. Most of it is already spoken for.', play: 'Trace one day of bracelets: what came in, what went out, what stayed. Then sort what counts as a cost.' },
  { grade: 'g4', week: 8, title: 'Cost and Price', line: 'Two different numbers that beginners mix up, and the gap between them is the business.', play: 'Fill the gaps, price a cookie yourself, and see what 100 of them do at a price that is too low.' },
  { grade: 'g4', week: 9, title: 'Profit: What Is Left', line: 'The number that tells you whether any of this was worth doing.', play: 'Three days at one stand, two stands with the same revenue, and a loss written with a minus sign.' },
  { grade: 'g4', week: 19, title: 'What It Costs to Make One', line: 'Add up every single thing. The ones you forget are the ones that eat your profit.', play: 'Your materials list: pack price, how many in a pack, used per item, cost per item, and the total for one.' },
  { grade: 'g4', week: 20, title: 'Choosing Your Price', line: 'The one number you get to decide. Three ways to decide it, and none of them is guessing.', play: 'Test your price: is it above your cost, is it easy to hand over, and what does a day at it keep?' },
  { grade: 'g4', week: 21, title: 'Profit on One Sale', line: 'Cost from week 19, price from week 20. Subtract. This is the number that decides things.', play: 'Your price and cost, scaled up to 5, 10, 25 and 50 sales, and how many sales reach a goal.' },
  { grade: 'g4', week: 22, title: 'How Many Can You Make?', line: 'Time is a material too, and it is the one you cannot buy more of.', play: 'Minutes per item, hours a week, weeks to go: your capacity, against the money limit.' },
  { grade: 'g4', week: 32, title: 'Count It Up', line: 'Revenue first. The big cheerful number, counted properly before anything comes out.', play: 'Your tally, a row per price, added up to total revenue.' },
  { grade: 'g4', week: 33, title: 'Did You Make a Profit?', line: 'Revenue minus every cost. Including the ones you would rather not count.', play: 'Every cost, the profit, the money-box check the other way, and profit per hour.' },
  { grade: 'g5', week: 2, title: 'Two Kinds of Cost', line: 'Some costs happen once. Some happen again every single time you sell one.', play: 'Make 10, 25 or 50 cups, or any number, and watch what the sign does to the cost of one.' },
  { grade: 'g5', week: 4, title: 'Margin', line: 'The gap between price and cost, and that gap as a share of the price.', play: 'Fill the table for the four products, then rank them two ways and see the rankings disagree.' },
  { grade: 'g5', week: 5, title: 'Break Even', line: 'How many you must sell before you have made a single cent.', play: 'Sell one at a time and watch the loss shrink to zero. Then change the fixed costs or the margin.' },
  { grade: 'g5', week: 6, title: 'The Price Ladder', line: 'Every price is a bet: fewer sales at more each, or more sales at less each.', play: 'Pick a rung, see the money in and the profit, and find the two prices that peak.' },
  { grade: 'g5', week: 9, title: 'Four Products, One Table', line: 'The moment you sell more than one thing, you need to know which one is carrying you.', play: 'Fill the table, answer the four questions, and see why they do not all point at the same product.' },
  { grade: 'g5', week: 22, title: 'Your Break-Even, In Units', line: 'The number that decides whether your plan is sensible or a wish.', play: 'Type your own fixed costs and margins and get your break-even, rounded up.' },
  { grade: 'g5', week: 23, title: 'The Forecast', line: 'Write down what you think will happen, before it happens. Then you cannot move it.', play: 'Enter your forecast for two products and see the money in and the total margin.' },
  { grade: 'g5', week: 24, title: 'The Business Plan', line: 'Everything from weeks 13 to 23, on one page, with the numbers in it.', play: 'Your fixed costs, margin and forecast: the profit if it comes true, and at half of it.' },
  { grade: 'g5', week: 33, title: 'Change One Thing', line: 'One change, written down with what you expect it to do. Only one.', play: 'Drop a price and sell more. Does the total margin go up or down?' },
  { grade: 'g5', week: 35, title: 'Did It Work?', line: 'Two sessions, one change, and an honest answer about what it did.', play: 'Compare two sessions by sales per person, not by sales.' },
  { grade: 'g6', week: 3, title: 'Out of a Hundred', line: 'Sixty cents of margin sounds fine. Sixty cents on a four dollar price is a different story.', play: 'Margin in dollars and as a percent for rows b to e, find the two that match, and price a 40 percent margin.' },
  { grade: 'g6', week: 4, title: 'Markup Is Not Margin', line: 'The same dollar, measured against two different things, and plenty of adults mix them up.', play: 'The same dollar against the cost and against the price, and a supplier who works on 25 percent of what?' },
  { grade: 'g6', week: 10, title: 'Revenue Is a Formula', line: 'You have been adding sales up for two years. This week it gets a letter and stops being addition.', play: 'R = p x q for rows b to e, then change p and q and watch the straight line tilt and slide.' },
  { grade: 'g6', week: 11, title: 'Change the Price, Change the Line', line: 'Price is the one number you choose. Everything else is the market answering back.', play: 'Pick a price, see how many sell, and find where revenue peaks and where profit does.' },
  { grade: 'g6', week: 12, title: 'The Market Detective', line: 'Eleven weeks of tools, one market, and nobody telling you which tool to use.', play: 'Four critter card stalls and six questions: unit price, margin, revenue, a loss with its sign, a ratio, a range.' },
  { grade: 'g6', week: 20, title: 'Pricing Against Somebody Else', line: 'Match, go under, or charge more. Three choices, and each one is a sum before it is an opinion.', play: 'Match, under or over their $4.00 with your own cost, then play the price war one move at a time.' },
  { grade: 'g6', week: 21, title: 'What a Discount Really Costs', line: 'Ten percent off the price is not ten percent off you. It is much more, and here is the arithmetic.', play: 'Four discounts, the margin each leaves, the extra sales each needs, and the one that leaves nothing.' },
  { grade: 'g6', week: 22, title: 'Bundles', line: 'Two for a price is a discount wearing a disguise. Work out what is under it.', play: 'Each in the bundle and the margin on the deal for bundles b to d, then design one of your own.' },
  { grade: 'g6', week: 23, title: 'The Share You Are Going For', line: 'How many buyers exist, and how many of them are you actually aiming at?', play: 'Market size, who might buy, an even share, and the number you are aiming at, for your own market.' },
  { grade: 'g6', week: 31, title: 'Your Share of the Market', line: 'The number you aimed at in week 23, next to the number you got.', play: 'Four teams, one total: fraction, simplest form and percent for each, adding to 100.' },
  { grade: 'g6', week: 35, title: 'Did the Move Work?', line: 'Your sales went up. So did theirs. So did everybody\'s. Now prove your move did anything.', play: 'Two rounds of sales, yours and the whole market: growth, share, and whether you can tell.' },
];

export const findGame = (grade: string, week: number) => GAMES.find((g) => g.grade === grade && g.week === week);
export const gamesFor = (grade: Game['grade']) => GAMES.filter((g) => g.grade === grade);
