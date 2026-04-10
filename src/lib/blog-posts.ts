import { getAllStates } from "@/lib/stateData";
import { stateToSlug } from "@/lib/stateSlugs";
import type { StateRequirements } from "@/lib/types";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  readTime: string;
  category: "Basics" | "Process" | "Mistakes" | "State Law" | "Estate Planning";
  content: string;
}

const HAND_WRITTEN_POSTS: BlogPost[] = [
  {
    slug: "do-i-need-a-will-if-i-dont-own-much",
    title: "Do I Need a Will If I Don't Own Much?",
    description:
      "The 'I don't own enough to need a will' myth is the single biggest reason Americans die intestate. Here's why it's wrong, and what actually happens when you skip a will.",
    date: "2026-04-10",
    author: "I Don't Have a Will",
    readTime: "7 min read",
    category: "Basics",
    content: `
<p class="lead">This is general legal information, not legal advice. State laws vary, and your situation may require a licensed attorney. This article is written to help you understand the basics and decide what to do next.</p>

<h2>The Myth That Costs Families the Most</h2>

<p>The most common reason people give for not having a will is some version of "I don't have enough stuff to worry about it." You might not own a house. Your bank account balance isn't going to make the news. You don't have a trust fund. The car is older than your dog. So what's the point of a will?</p>

<p>The point is that "not much" is still <em>something</em>, and that something will go somewhere when you die. A will is the difference between you deciding where it goes and your state deciding for you. The state's default plan — called intestate succession — is blunt, generic, and often produces results that surprise the family left behind.</p>

<h2>What "Not Much" Actually Means</h2>

<p>When people say they don't own much, they're usually thinking about big assets — a house, a retirement account, a paid-off car. They forget about the things that add up to more than they'd guess. A realistic inventory of "not much" often includes:</p>

<ul>
<li><strong>Your checking and savings accounts.</strong> Even a few thousand dollars is worth someone's attention.</li>
<li><strong>Your car.</strong> Even a depreciating one has a title, and someone has to figure out who it goes to.</li>
<li><strong>Your furniture, electronics, and clothes.</strong> These are technically part of your estate.</li>
<li><strong>Sentimental items.</strong> Photos, heirlooms, jewelry, a grandparent's watch — these cause more family fights than money ever does.</li>
<li><strong>Digital assets.</strong> Your phone, your laptop, your photos in the cloud, your email, your crypto, your PayPal balance, your social media accounts. Most people don't realize how many logins are now "assets."</li>
<li><strong>Any debts you have.</strong> Yes, debt matters in probate too — a will doesn't erase it, but it affects how the estate is handled.</li>
<li><strong>Your pets.</strong> Pets are legally property. Without a will, they end up wherever the state thinks is reasonable.</li>
</ul>

<p>Add it up and "not much" usually turns into somewhere between $5,000 and $50,000 in total value — plus things money can't measure.</p>

<h2>What Happens Without a Will</h2>

<p>If you die without a will, your state's <a href="/estate-planning">intestate succession laws</a> take over. These are default rules that assign your property to specific relatives in a specific order. The order varies by state, but a typical sequence looks like this:</p>

<ol>
<li>Spouse (sometimes everything, sometimes a share)</li>
<li>Children</li>
<li>Parents</li>
<li>Siblings</li>
<li>Grandparents</li>
<li>Aunts, uncles, cousins</li>
<li>The state itself (if no heirs can be found)</li>
</ol>

<p>This sounds reasonable until you run it against real life. The state's definition of "spouse" doesn't include unmarried partners, no matter how long you lived together. "Children" means biological or legally adopted — not stepchildren, not godchildren, not the niece you basically raised. "Parents" includes both of them equally, including the one you haven't spoken to in 20 years.</p>

<p>Intestate succession also doesn't care about your actual relationships. It doesn't know which sibling you're close with and which one you'd cross the street to avoid. It doesn't know that you promised your guitar to your best friend. It doesn't know that your brother is terrible with money. It just applies the rule.</p>

<h2>Five Scenarios Where "Not Much" Creates Real Problems</h2>

<h3>1. You Have an Unmarried Partner</h3>

<p>This is the single most common intestate-succession disaster. If you're living with a partner and aren't legally married, they get exactly <strong>nothing</strong> under intestate law in most states. Your stuff goes to your parents or siblings instead. Your partner — the person you built a life with — has no claim to anything, including the couch you bought together.</p>

<h3>2. You Have Stepchildren</h3>

<p>Stepchildren are not legal children unless you formally adopted them. If you die intestate, your biological children inherit and your stepchildren get nothing, even if you raised them from kindergarten.</p>

<h3>3. You Have a Pet</h3>

<p>Your pet is property. Without a will naming a caretaker, your dog or cat becomes part of the estate like a piece of furniture. Family members may argue about who takes them, or nobody may want to — and pets can end up in shelters because there was no plan.</p>

<h3>4. You Want a Specific Person to Make Decisions</h3>

<p>A will lets you name an executor — the person who handles your estate. Without one, the court appoints someone, usually the closest available relative. That person may or may not be the one you'd have chosen, and they'll be making decisions about your property, your debts, and your memorial.</p>

<h3>5. You Have Minor Children</h3>

<p>If you have young kids and no will, and both parents die, the court decides who raises your children. Without a named guardian, the decision falls to a judge who has never met your family. This is the single most important reason for a will if you're a parent — and it has nothing to do with how much money you have.</p>

<h2>The Real Cost of "Not Much"</h2>

<p>The argument for a will isn't about the size of your estate. It's about the cost of someone else deciding. Probate fees, court delays, family conflict, lost heirlooms, pets in shelters, partners locked out of apartments, stepchildren cut off — none of these require a big estate to happen. They happen because nobody wrote down what they wanted.</p>

<p>A simple will takes about 10 minutes to draft and costs nothing. It won't cover every possible situation, but it will cover the basics: who gets your stuff, who takes care of the people and pets you love, and who's in charge when you're gone. For most people with "not much," a simple will is enough.</p>

<h2>The Fastest Way to Fix This</h2>

<p>If you've been putting this off because it sounded complicated or expensive, here's what you actually need:</p>

<ul>
<li><strong>A list of your beneficiaries.</strong> Who gets what. Can be as simple as "everything to my sister."</li>
<li><strong>A named executor.</strong> The person who handles your estate. Usually a trusted adult.</li>
<li><strong>A guardian for minor children, if applicable.</strong></li>
<li><strong>Signatures and witnesses.</strong> Most states require the will to be signed in front of two witnesses.</li>
</ul>

<p>That's the core of a valid simple will. You can write one in ten minutes using our <a href="/create">free will drafting tool</a>, which walks you through the questions and generates a state-specific document. No account, no cost, no data stored on our servers.</p>

<p>The single best thing you can do for the people you love — even if you don't own much — is leave them a plan instead of a problem.</p>
`,
  },
  {
    slug: "what-happens-if-you-die-without-a-will",
    title: "What Happens If You Die Without a Will? Intestate Succession Explained",
    description:
      "If you die without a will, your state decides where your stuff goes. Here's how intestate succession actually works, and who typically inherits what.",
    date: "2026-04-10",
    author: "I Don't Have a Will",
    readTime: "8 min read",
    category: "Basics",
    content: `
<p class="lead">This is general legal information, not legal advice. Intestate succession rules vary meaningfully by state. For decisions that affect your family, consult a licensed attorney.</p>

<h2>The Short Answer</h2>

<p>If you die without a will, you die "intestate." Your property is distributed according to your state's intestate succession laws — a default legal template that assigns your estate to specific relatives in a specific order. The state is not trying to guess what you would have wanted. It is applying a formula.</p>

<p>The formula is often reasonable, but it is also rigid, impersonal, and frequently different from what the person actually would have chosen. It can exclude the people you love most and include relatives you barely know. Understanding how it works is the best reason to not rely on it.</p>

<h2>How Intestate Succession Actually Works</h2>

<p>The process has three stages:</p>

<h3>Stage 1: Identify the Estate</h3>

<p>The court figures out what you owned at the time of death. This includes bank accounts, property, vehicles, investments, personal possessions, and sometimes digital assets. Some things bypass this process entirely — life insurance policies with named beneficiaries, retirement accounts with named beneficiaries, and anything held in a trust. Those go directly to the named party and are not affected by intestate succession.</p>

<h3>Stage 2: Pay Off Debts and Expenses</h3>

<p>Before anyone inherits, the estate has to pay outstanding debts, funeral costs, and administrative expenses. A will does not erase your debts — neither does dying without one. The estate is the first thing creditors come after.</p>

<h3>Stage 3: Distribute What's Left</h3>

<p>Whatever remains is distributed under the intestate formula. This is the part most people get wrong assumptions about.</p>

<h2>The General Order of Inheritance</h2>

<p>While every state has its own specifics, most follow a similar priority order. A typical sequence:</p>

<ol>
<li><strong>Spouse.</strong> Usually the first priority. In some states the spouse gets everything. In others, they share with the children or parents.</li>
<li><strong>Children.</strong> If there's no spouse, children usually take the full estate, divided equally. If the spouse is alive, children may share a portion.</li>
<li><strong>Parents.</strong> If no spouse or children, parents inherit.</li>
<li><strong>Siblings.</strong> If no parents, siblings inherit (sometimes equally, sometimes by representation).</li>
<li><strong>Grandparents, aunts, uncles, nieces, nephews.</strong> The next tier if the above are gone.</li>
<li><strong>Distant relatives.</strong> Cousins and beyond.</li>
<li><strong>The state.</strong> If no heirs can be located, the property "escheats" — it becomes property of the state.</li>
</ol>

<p>You can check how <a href="/estate-planning">your specific state</a> handles intestate succession on our state guides, each of which has the local rules laid out plainly.</p>

<h2>Who Is NOT Included</h2>

<p>This is where intestate succession creates the most painful surprises. The default rules do not include:</p>

<h3>Unmarried Partners</h3>

<p>No matter how long you've been together, if you're not legally married, your partner has no intestate claim in most states. Common-law marriage exists in only a handful of states, and even there it has specific requirements.</p>

<h3>Stepchildren</h3>

<p>Unless you legally adopted them, stepchildren are not your children under intestate law. Biological and legally adopted children inherit. Stepchildren do not.</p>

<h3>Close Friends</h3>

<p>No matter how close they were to you, friends have zero standing in intestate succession. If you wanted your best friend to get your guitar or your record collection, a will is the only way to make that happen.</p>

<h3>Charities</h3>

<p>If you wanted anything to go to a charity, a church, an alma mater, or a cause you believed in, intestate succession will not route anything there. Ever.</p>

<h3>People You Just Like Better</h3>

<p>The rules don't care about your actual relationships. A sibling you love and a sibling you haven't seen in 20 years are treated identically. A parent who raised you and a parent who didn't are treated identically.</p>

<h2>Minor Children and Guardianship</h2>

<p>If you have young kids, intestate succession also does not name a guardian for them. The court decides who raises your children based on what the judge considers the best available family option, and that decision may not match what you would have chosen. Naming a guardian is one of the single most important reasons for a will if you're a parent.</p>

<h2>What About Small Estates?</h2>

<p>Many states have "small estate" procedures that simplify probate when the estate is below a certain value — usually somewhere between $50,000 and $200,000 depending on the state. These streamlined processes are faster and cheaper than full probate, but they still follow the intestate formula for distribution. A small estate does not escape intestate succession — it just goes through it more quickly.</p>

<h2>The Executor vs. The Administrator</h2>

<p>When you write a will, you name an <strong>executor</strong> — the person who handles your estate. When you die intestate, there's no executor. Instead, the court appoints an <strong>administrator</strong>, usually the closest available relative who is willing to serve. This person has the same responsibilities as an executor but was not chosen by you.</p>

<p>Being an administrator is a lot of work: gathering assets, notifying creditors, paying debts, handling tax filings, and distributing what's left. Whoever ends up in that role is going to spend months of their life untangling your affairs. Picking that person yourself, in a will, is a significant gift to whoever would otherwise be stuck with it by default.</p>

<h2>The Single Biggest Misunderstanding</h2>

<p>People often assume intestate succession will produce roughly the same result a will would have produced, just with more paperwork. That is not true. Intestate succession ignores partners, stepchildren, friends, charities, specific wishes, guardianship preferences, and personal relationships. It can leave the people closest to you with nothing and give the people you barely speak to everything.</p>

<p>The fix is a simple will. It does not have to be complicated, and it does not have to cost money. Use our <a href="/create">free will drafting tool</a> to write one in about ten minutes. State-specific, no account required, nothing stored on our servers. Whatever you decide, make it a decision — not a default.</p>
`,
  },
  {
    slug: "how-to-write-a-will-for-free",
    title: "How to Write a Will for Free (2026 Step-by-Step Guide)",
    description:
      "You don't need a lawyer or $500 to write a valid simple will. Here's the step-by-step process, the tools that work, and the legal requirements you actually have to meet.",
    date: "2026-04-10",
    author: "I Don't Have a Will",
    readTime: "9 min read",
    category: "Process",
    content: `
<p class="lead">This is general legal information, not legal advice. For complex estates, blended families, or anything unusual, consult a licensed attorney. For a simple will, the steps below are usually sufficient.</p>

<h2>The Short Version</h2>

<p>You can write a legally valid simple will for free in about ten minutes. It does not require a lawyer, a notary (in most states), or an online service fee. The only things you absolutely need are: a clear statement of who gets what, a named executor, your signature, and the signatures of two adult witnesses who are not beneficiaries. That's the core. Everything else is detail.</p>

<p>This article walks through the full process — the decisions you need to make, the legal requirements by state, the tools that make it easy, and the common mistakes that can invalidate an otherwise good will.</p>

<h2>Step 1: Take Inventory</h2>

<p>Before you write anything, make a list of what you actually own. This doesn't need to be exhaustive for a simple will, but it helps you think clearly. Include:</p>

<ul>
<li>Bank and investment accounts</li>
<li>Real estate (house, land)</li>
<li>Vehicles</li>
<li>Valuable personal items (jewelry, heirlooms, collectibles)</li>
<li>Digital assets (accounts, crypto, domain names)</li>
<li>Pets</li>
<li>Outstanding debts</li>
</ul>

<p>You don't have to list every fork and mug. A simple will typically handles assets in broad categories ("all my personal possessions") with specific bequests for the handful of items that matter most.</p>

<h2>Step 2: Decide Who Gets What</h2>

<p>This is the decision layer. For each significant asset, decide who should inherit it. You can be specific ("my grandmother's wedding ring to my daughter") or general ("everything else, divided equally among my three children"). Most simple wills combine both.</p>

<p>If you have minor children, also decide:</p>

<ul>
<li><strong>Who will be their guardian</strong> if both parents die</li>
<li><strong>Who will manage any money you leave them</strong> until they reach adulthood</li>
</ul>

<p>These are often the same person, but they don't have to be. Separating the guardian (who raises the child) from the trustee (who manages the money) is a common choice when you trust someone with your kids but not with your finances.</p>

<h2>Step 3: Pick an Executor</h2>

<p>The executor is the person who handles your estate after you die — gathering assets, paying debts, filing paperwork, and distributing what's left. Being an executor takes work. Pick someone who is:</p>

<ul>
<li>Trustworthy</li>
<li>Organized and responsive</li>
<li>Willing to do it (ask them first)</li>
<li>Ideally, geographically close (helps with practical things like handling mail and court visits)</li>
<li>Likely to outlive you (so consider naming a backup)</li>
</ul>

<p>Many people pick a spouse, adult child, or sibling. You can also pick a close friend. What you want to avoid is picking someone who is flaky, lives far away, or has a history of conflict with the rest of the family.</p>

<h2>Step 4: Know Your State's Requirements</h2>

<p>Every state has specific requirements for a valid will, and they vary more than most people expect. The most common requirements are:</p>

<ul>
<li><strong>Legal age.</strong> You must be at least 18 in most states (some states allow 16-17 with conditions).</li>
<li><strong>Sound mind.</strong> You must understand what a will is, what you own, and who your heirs are.</li>
<li><strong>Written form.</strong> Most states require a written, signed will. A few allow "holographic" (handwritten) wills; even fewer allow oral wills under very specific circumstances.</li>
<li><strong>Signature.</strong> You must sign the will.</li>
<li><strong>Witnesses.</strong> Most states require two witnesses who watch you sign and then sign themselves. Witnesses generally cannot be beneficiaries.</li>
<li><strong>Notarization (optional in most states).</strong> Most states do not require notarization, but some allow a "self-proving affidavit" signed in front of a notary, which speeds up probate later.</li>
</ul>

<p>The specifics vary — check your <a href="/will-requirements">state's requirements</a> before you sign.</p>

<h2>Step 5: Draft the Document</h2>

<p>Here's where most people get stuck. You don't need a lawyer to draft a simple will — but you do need the document to be written in the right form and include the right language to be valid.</p>

<p>The easiest way to handle this is with a free will drafting tool that walks you through the questions and generates a state-specific document. Our <a href="/create">free tool</a> does exactly this: you answer a series of questions (about ten minutes), and it produces a downloadable PDF tailored to your state. No account required, nothing stored on our servers. You read, sign, and keep it.</p>

<p>If you'd rather draft it yourself, a valid simple will typically includes:</p>

<ul>
<li>A header identifying the document as your last will and testament</li>
<li>A statement revoking any prior wills</li>
<li>Your full legal name and state of residence</li>
<li>Appointment of an executor (and an alternate)</li>
<li>Appointment of a guardian for minor children (if applicable)</li>
<li>Specific bequests (particular items to particular people)</li>
<li>A residuary clause (who gets "everything else")</li>
<li>Signature block with date and place of signing</li>
<li>Witness signature blocks</li>
</ul>

<h2>Step 6: Sign It the Right Way</h2>

<p>This is the step where valid wills become invalid. To sign a will properly:</p>

<ol>
<li>Gather the required number of witnesses (two in almost every state)</li>
<li>Witnesses must be adults, not beneficiaries, not the executor</li>
<li>All of you are in the same room at the same time</li>
<li>You sign first, then the witnesses sign, watching each other</li>
<li>Use a blue pen (helps distinguish an original from a copy)</li>
<li>Sign every page if the will has multiple pages</li>
<li>If your state allows a self-proving affidavit, sign that in front of a notary — optional but helpful</li>
</ol>

<p>The single most common reason a simple will gets thrown out is that the signing ceremony wasn't handled correctly. It's worth slowing down on this step.</p>

<h2>Step 7: Store It Somewhere Findable</h2>

<p>A will that nobody can find is the same as no will at all. Store the original in a place where your executor knows to look. Good options:</p>

<ul>
<li>A fireproof home safe (most common)</li>
<li>A safe deposit box (but some states require court access after death, which causes delays)</li>
<li>With your attorney if you have one</li>
<li>Your state's will registry if it has one (not all states do)</li>
</ul>

<p>Tell your executor where the will is stored. Do not just put it in a drawer and hope someone finds it.</p>

<h2>Step 8: Review and Update as Life Changes</h2>

<p>A will is not a one-time thing. Review it every 3-5 years or after any major life event:</p>

<ul>
<li>Marriage, divorce, remarriage</li>
<li>New children or grandchildren</li>
<li>Death of a beneficiary, executor, or guardian</li>
<li>Major changes in assets (inheritance, home purchase, business sale)</li>
<li>Moving to a different state</li>
</ul>

<p>When you update, either draft a new will that revokes the previous one (cleaner) or add a codicil (a formal amendment). A new will is usually simpler.</p>

<h2>Common Pitfalls to Avoid</h2>

<ul>
<li><strong>Letting a beneficiary witness the will.</strong> In most states this invalidates that beneficiary's share.</li>
<li><strong>Not naming a backup executor.</strong> If your primary executor dies or can't serve, the court picks one.</li>
<li><strong>Forgetting to update after major life changes.</strong> An ex-spouse named in an old will can still inherit in some states if not removed.</li>
<li><strong>Burying the will where nobody can find it.</strong> Tell someone.</li>
<li><strong>Writing it too narrowly.</strong> Without a residuary clause, anything you forgot to mention goes through intestate succession.</li>
</ul>

<h2>The Fastest Path</h2>

<p>For most people, the fastest path to a valid will is:</p>

<ol>
<li>Use our <a href="/create">free drafting tool</a> (10 minutes, state-specific, no cost)</li>
<li>Print the generated PDF</li>
<li>Gather two adult witnesses who are not beneficiaries</li>
<li>Sign in front of them; they sign after you</li>
<li>Store it somewhere your executor can find it</li>
<li>Tell your executor where it is</li>
</ol>

<p>That's the whole process. A simple will does not have to be hard, expensive, or overwhelming — and having one is a meaningful gift to the people you'd leave behind.</p>
`,
  },
  {
    slug: "do-i-need-a-lawyer-to-make-a-will",
    title: "Do I Need a Lawyer to Make a Will?",
    description:
      "Honest answer: most people don't need a lawyer for a simple will. Here's who genuinely does, who doesn't, and how to tell which category you're in.",
    date: "2026-04-10",
    author: "I Don't Have a Will",
    readTime: "7 min read",
    category: "Process",
    content: `
<p class="lead">This is general legal information, not legal advice. If any of the "you probably need a lawyer" scenarios apply to you, talk to a licensed attorney in your state.</p>

<h2>The Honest Answer</h2>

<p>Most people do not need a lawyer to write a simple will. If your situation is straightforward — one spouse, clear heirs, a modest estate, no business, no tax concerns — a self-drafted will using a legitimate tool is usually sufficient and will hold up in probate court just fine.</p>

<p>That said, some situations really do call for a lawyer. The trick is being honest with yourself about which category you're in, because self-drafting a will that actually needs a lawyer is worse than not having one at all.</p>

<h2>When You Probably Don't Need a Lawyer</h2>

<p>You can almost certainly write a valid simple will yourself if:</p>

<ul>
<li><strong>Your estate is modest.</strong> Under a few hundred thousand dollars in total value.</li>
<li><strong>Your wishes are straightforward.</strong> "Everything to my spouse, then to my kids equally" is the most common pattern, and it's trivially handled in a simple will.</li>
<li><strong>You don't own a business.</strong> Businesses create complications — succession, valuation, operational control — that a simple will doesn't handle well.</li>
<li><strong>You don't have unusual family dynamics.</strong> No blended family disputes, no estranged children, no disputes over who should inherit.</li>
<li><strong>You don't expect estate tax issues.</strong> The federal estate tax exemption is high (over $13M per person in 2026), so most estates don't owe federal estate tax. But some states have lower thresholds.</li>
<li><strong>You don't have beneficiaries with special needs.</strong> Leaving money directly to someone on government benefits can disqualify them from those benefits. This needs a special-needs trust, which needs a lawyer.</li>
<li><strong>You're not trying to exclude a spouse.</strong> Most states protect spouses from being fully disinherited. You generally cannot write a simple will that leaves your spouse nothing.</li>
</ul>

<p>If you checked all of those, a self-drafted simple will using our <a href="/create">free tool</a> is probably all you need.</p>

<h2>When You Should See a Lawyer</h2>

<p>There are real situations where the cost of a lawyer ($300-$1,500 for a standard estate plan in most markets) is worth it. These include:</p>

<h3>Blended Families With Inheritance Conflicts</h3>

<p>If you have children from a previous marriage and a current spouse, you're in one of the highest-risk categories for an estate contest. Competing claims from a stepparent and biological children are the single most common source of estate litigation. A lawyer can structure a plan — often using a trust — that protects everyone's expectations.</p>

<h3>Business Ownership</h3>

<p>Businesses don't transfer through a will like a bank account does. You need to think about operational control, buyout agreements among co-owners, valuation methods, and tax treatment. This is lawyer territory — and often accountant territory too.</p>

<h3>Real Estate in Multiple States</h3>

<p>If you own property in more than one state, each state's probate court can get involved in distributing that property. This is called "ancillary probate" and it's expensive and slow. A lawyer can structure ownership (often via a trust) to avoid the multi-state mess.</p>

<h3>Estate Tax Concerns</h3>

<p>The federal estate tax exemption is currently high, but some states tax estates at much lower thresholds — sometimes as low as $1M. If your estate plus life insurance plus retirement accounts might cross your state's threshold, you need professional tax planning, not a self-drafted will.</p>

<h3>Special Needs Beneficiaries</h3>

<p>If you want to leave money to a beneficiary who receives SSI, Medicaid, or other means-tested benefits, a direct inheritance can disqualify them. A special needs trust preserves the benefits while allowing the money to help them. You need a lawyer to draft this correctly.</p>

<h3>Disinheriting Close Relatives</h3>

<p>If you want to cut someone out who would normally inherit (a child, a spouse in most states), you need to do it carefully. Challenges to disinheritance are common, and courts can reverse a cut-out if the language isn't clear enough. A lawyer can draft language that holds up.</p>

<h3>Concerns About Mental Capacity Challenges</h3>

<p>If there's any chance someone might challenge your will on grounds that you weren't of sound mind, a lawyer can help document capacity at the time of signing and make the will significantly harder to overturn.</p>

<h3>Trusts and Advanced Planning</h3>

<p>If you need a revocable living trust, an irrevocable trust, or any other advanced vehicle, a lawyer is essentially required. A simple will is not a substitute for a trust, and some goals (avoiding probate, asset protection, controlling inheritance timing) can only be achieved with a trust.</p>

<h2>The Middle Ground: Self-Drafted + Lawyer Review</h2>

<p>A lot of people overlook a third option: draft your will yourself with a free tool, then pay a lawyer $150-$300 for a one-hour review. This gets you the efficiency of self-drafting with the peace of mind of a professional sanity check.</p>

<p>If you're in any of the "gray area" categories — maybe your estate is moderate, maybe your family is slightly complicated, maybe you're just not sure — this is a reasonable path. You keep most of the cost savings but get an expert second look.</p>

<h2>What a Lawyer Actually Does</h2>

<p>When you pay a lawyer to draft a will, you're paying for:</p>

<ul>
<li><strong>Their knowledge of your state's law.</strong> They know what will hold up and what won't.</li>
<li><strong>Tailoring to your situation.</strong> Custom clauses for unusual circumstances.</li>
<li><strong>Judgment calls.</strong> Knowing when a simple will is enough and when you need a trust.</li>
<li><strong>The paperwork ceremony.</strong> Witnesses, notarization, self-proving affidavits, storage.</li>
<li><strong>A relationship for updates.</strong> Someone to call when life changes.</li>
</ul>

<p>For a simple estate, a self-drafted will gives you most of this for free. The state-specific language is built into good drafting tools, the questions walk you through the decisions, and you handle the signing yourself. The things you lose are the judgment calls and the relationship — which are worth a lot for complex estates and not much for simple ones.</p>

<h2>How to Decide in One Minute</h2>

<p>Ask yourself these questions. If the answer is "yes" to any of them, lean toward a lawyer:</p>

<ol>
<li>Is your total estate worth more than $1 million?</li>
<li>Do you own real estate in more than one state?</li>
<li>Do you own a business with significant value?</li>
<li>Do you have children from a previous marriage AND a current spouse?</li>
<li>Do you want to disinherit a close relative?</li>
<li>Do you have a beneficiary on government benefits?</li>
<li>Does your state have estate tax, and is your estate near the threshold?</li>
<li>Do you need a trust to achieve your goals?</li>
</ol>

<p>If you answered "no" to all eight, a self-drafted simple will using our <a href="/create">free tool</a> is very likely the right call. You'll save time and money, and you'll walk away with a legally valid will that does exactly what most people need.</p>

<p>If you answered "yes" to any of them, find a local estate planning attorney. A $500 consultation will save your family far more than that in probate friction and family conflict.</p>
`,
  },
  {
    slug: "common-mistakes-that-invalidate-a-will",
    title: "Common Mistakes That Invalidate a Will",
    description:
      "A will is only useful if it holds up in court. Here are the most common mistakes that get otherwise good wills thrown out — and how to avoid each one.",
    date: "2026-04-10",
    author: "I Don't Have a Will",
    readTime: "7 min read",
    category: "Mistakes",
    content: `
<p class="lead">This is general legal information, not legal advice. Will validity rules vary by state, and specific situations can have exceptions. When in doubt, consult a licensed attorney in your state.</p>

<h2>Why This Matters</h2>

<p>Writing a will is only part of the job. It also has to hold up under probate court scrutiny. Every year, wills that were perfectly reasonable get thrown out — or partially invalidated — because of small technical mistakes in how they were drafted, signed, or witnessed. The result is the same as having no will at all: your estate gets distributed under intestate succession, and your wishes don't matter.</p>

<p>The good news is that nearly all of these mistakes are easy to avoid if you know what they are. Here are the most common ones.</p>

<h2>Mistake 1: Signing Without Enough Witnesses</h2>

<p>Almost every US state requires two witnesses for a valid will. A few require three. Some states allow a single witness in very limited circumstances (holographic wills, for example). Getting this number wrong is the single most common reason a will gets invalidated.</p>

<p><strong>The fix:</strong> Check your <a href="/will-requirements">state's witness requirements</a> before you sign. Err on the side of more rather than fewer. Two adult witnesses who are not beneficiaries is the safest universal standard.</p>

<h2>Mistake 2: Using Beneficiaries as Witnesses</h2>

<p>In most states, a witness cannot be a beneficiary of the will. If they are, the witness is still valid but they may lose their inheritance under the will (sometimes called "purging"). In a small number of states, this can invalidate the whole will.</p>

<p><strong>The fix:</strong> Use witnesses who are not named in the will at all — coworkers, neighbors, friends who aren't inheriting anything. Never use your spouse, children, or anyone else who's getting something under the will.</p>

<h2>Mistake 3: Not Signing in Front of the Witnesses</h2>

<p>The legal requirement in most states is that the witnesses must physically watch you sign the will, and then sign themselves in your presence. Signing alone in a closet and then handing the document to witnesses later does not satisfy the requirement. The whole point of witnesses is that they can testify that they saw you sign it of your own free will.</p>

<p><strong>The fix:</strong> Do the signing as a single ceremony. You, the witnesses, same room, same time. You sign first, then each witness signs while the others watch.</p>

<h2>Mistake 4: Ambiguous or Contradictory Language</h2>

<p>If your will says "I leave my car to Jim" but you own three cars, a probate court has to figure out what you meant. If the language is truly unclear, the disputed bequest may be thrown out and fall into your residuary clause — or if there's no residuary clause, into intestate succession.</p>

<p>The same problem happens when different sections of the will contradict each other: "I leave my house to Sarah" in one clause and "I leave everything to Mark" in a later one. Courts try to reconcile these, but sometimes they can't.</p>

<p><strong>The fix:</strong> Be specific. If you own multiple items of the same type, identify which one. Include a residuary clause ("I leave everything else not specifically mentioned to ____") to catch anything that falls through the cracks. Review the full document for contradictions before signing.</p>

<h2>Mistake 5: Forgetting the Residuary Clause</h2>

<p>The residuary clause is the catch-all: it says where everything goes that isn't specifically mentioned elsewhere. Without one, anything you forgot to list — a forgotten bank account, a tax refund after death, a newly purchased item — passes by intestate succession. Partial intestacy like this is common and usually preventable.</p>

<p><strong>The fix:</strong> Always include a residuary clause. A simple version: "I leave all the rest, residue, and remainder of my estate to ____."</p>

<h2>Mistake 6: Naming Only One Executor With No Backup</h2>

<p>If your executor dies before you, refuses to serve, or can't be located, the court has to appoint someone else — usually the closest available relative. This can lead to the exact outcome you were trying to avoid: an administrator appointed by default, not chosen by you.</p>

<p><strong>The fix:</strong> Name both a primary and a backup executor. Pick people who are likely to outlive you. Tell both of them in advance.</p>

<h2>Mistake 7: Not Naming a Guardian for Minor Children</h2>

<p>If you have kids under 18 and no named guardian, and both parents die, the court decides who raises your children. The judge weighs factors like family relationships, financial stability, and where the child has been living — but the judge has never met your family and will make a decision based on limited information.</p>

<p><strong>The fix:</strong> Name a guardian in the will. Name a backup too. Discuss it with the person before you name them. If the primary guardian is a couple (e.g., a married sibling), think about what happens if they divorce.</p>

<h2>Mistake 8: Trying to Disinherit a Spouse</h2>

<p>Most states protect spouses from being fully disinherited. A surviving spouse has an "elective share" — usually a third to half of the estate — that they can claim no matter what the will says. If you try to leave your spouse nothing, they can override that in court.</p>

<p><strong>The fix:</strong> If you're genuinely trying to cut out a spouse, you need a prenup or postnup, not a will. A will alone cannot achieve this in most states. Talk to a lawyer.</p>

<h2>Mistake 9: Updating Without Revoking the Previous Will</h2>

<p>If you write a new will without a clear statement revoking previous wills, you can end up with two wills that partially contradict each other. Courts will try to reconcile them, but the result is often a mess. In some cases the older will is treated as still valid for parts not covered by the newer one.</p>

<p><strong>The fix:</strong> Every new will should include a sentence like "I revoke all previous wills and codicils." When you sign the new will, physically destroy the old one if possible, and remove any copies from where they're stored.</p>

<h2>Mistake 10: Not Updating After Major Life Events</h2>

<p>A will drafted before a divorce, remarriage, new child, or major asset change can produce exactly the wrong result if it isn't updated. Some states automatically revoke provisions for ex-spouses after divorce, but many don't. An old will can leave your entire estate to an ex.</p>

<p><strong>The fix:</strong> Review your will every 3-5 years and after any of these events: marriage, divorce, remarriage, birth of a child, death of a beneficiary or executor, major asset changes, moving to a different state.</p>

<h2>Mistake 11: Storing the Will Where Nobody Can Find It</h2>

<p>A valid will that nobody can locate is treated the same as no will at all. If your executor can't find it within a reasonable time, the court proceeds as if you died intestate, and your estate is distributed by default rules — not by your written wishes.</p>

<p><strong>The fix:</strong> Tell your executor where the will is stored. Put it somewhere fireproof and accessible — a home safe is usually fine. Safe deposit boxes are secure but can create access problems after death in some states.</p>

<h2>Mistake 12: Handwriting a Will in a State That Doesn't Allow It</h2>

<p>Some states accept "holographic" wills — entirely handwritten and signed by the testator, no witnesses required. Most states do not. If you write a holographic will in a state that doesn't recognize them, it's invalid.</p>

<p><strong>The fix:</strong> Unless you're sure your state allows holographic wills and you're sure you've followed all the specific rules (which are fussier than people assume), use a typed will signed in front of witnesses. It works in every state.</p>

<h2>The Simplest Path to a Valid Will</h2>

<p>Almost all of these mistakes come from trying to improvise a legal document without knowing what actually makes it hold up. The fastest way to avoid them is to use a tool that builds the right structure for your state automatically.</p>

<p>Our <a href="/create">free will drafting tool</a> walks you through the questions, generates a state-specific document with the correct clauses in the correct order, and provides signing instructions tailored to your state's requirements. It takes about ten minutes. No account, no cost, nothing stored.</p>

<p>A valid will does not have to be complicated. It just has to get the basics right — and the basics are easier than most people assume, once you know where the trapdoors are.</p>
`,
  },
];

/* ─────────────────────────────────────────────────────────────
 * State-specific posts (generated from stateData at module load)
 * One post per state: "How to Write a Will in [State] (2026 Guide)"
 * ───────────────────────────────────────────────────────────── */

function statePostSlug(stateName: string): string {
  return `how-to-write-a-will-in-${stateToSlug(stateName)}`;
}

function yesNo(b: boolean): string {
  return b ? "Yes" : "No";
}

function generateStatePostContent(s: StateRequirements): string {
  const stateName = s.state;
  const witnessCount = s.witness_requirements.count;
  const notarizationRequired = s.notarization.required;
  const selfProving = s.self_proving_affidavit.available;
  const holographic = s.holographic_wills.recognized;
  const electronic = s.electronic_wills.recognized;
  const minAge = s.minimum_age.standard;

  return `
<p class="lead">This is general legal information for ${stateName}, not legal advice. Will laws change, and specific situations can have exceptions. For any complex case, consult a licensed attorney in ${stateName}.</p>

<h2>Why Having a Will Matters</h2>

<p>A will is the simplest, clearest way to say what happens to your property, your minor children, and your affairs after you die. Without one, you die "intestate" and ${stateName}&rsquo;s default inheritance rules (called intestate succession) take over. Those rules are rigid and generic &mdash; they do not know your relationships, your intentions, or the people you care about most. They follow a fixed formula.</p>

<p>The cost of skipping a will is not hypothetical. It plays out the same way in ${stateName} as everywhere else: unmarried partners locked out, stepchildren with nothing, pets in shelters, court-appointed administrators, family disputes over items and money, and a probate process that is slower, messier, and more expensive than it needed to be. Whatever you own &mdash; even if you think it&rsquo;s "not much" &mdash; someone will have to deal with it after you&rsquo;re gone. A will decides whether that someone is you or a judge.</p>

<p>A simple ${stateName} will takes about ten minutes to draft using a free tool and costs nothing. You can <a href="/create">start drafting yours now</a>. The rest of this guide walks you through what makes a will legally valid in ${stateName} and how to avoid the technical mistakes that most commonly cause wills to be thrown out.</p>

<h2>${stateName} Will Requirements at a Glance</h2>

<ul>
<li><strong>Minimum age:</strong> ${minAge} years old${s.minimum_age.exceptions ? ` (${s.minimum_age.exceptions})` : ""}</li>
<li><strong>Written form:</strong> ${s.writing_requirement}</li>
<li><strong>Witnesses required:</strong> ${witnessCount}</li>
<li><strong>Notarization:</strong> ${notarizationRequired ? "Required" : "Not required for a standard signed will"}</li>
<li><strong>Self-proving affidavit:</strong> ${yesNo(selfProving)} ${selfProving ? "&mdash; recommended, it speeds up probate later" : ""}</li>
<li><strong>Holographic (handwritten) wills:</strong> ${yesNo(holographic)}</li>
<li><strong>Electronic wills:</strong> ${yesNo(electronic)}</li>
</ul>

<h2>Testamentary Capacity</h2>

<p>${s.testamentary_capacity}</p>

<h2>Signature Requirements in ${stateName}</h2>

<p>${s.signature_requirement.testator_must_sign ? `You must personally sign the will.` : `The will must be signed either by you or, in certain limited circumstances, by someone on your behalf.`} ${s.signature_requirement.proxy_signing_allowed ? `${stateName} does allow proxy signing in specific cases: ${s.signature_requirement.proxy_signing_rules}` : `Proxy signing (having someone else sign for you) is generally not allowed as a substitute for your own signature.`}</p>

<h2>Witness Requirements in ${stateName}</h2>

<p>${stateName} requires <strong>${witnessCount} witnesses</strong>. ${s.witness_requirements.qualifications}</p>

<p><strong>Presence rules:</strong> ${s.witness_requirements.presence_rules}</p>

<p><strong>Interested witnesses:</strong> ${s.witness_requirements.interested_witness_rules}</p>

<p>The safest approach in every state, including ${stateName}, is to use witnesses who are adults, not beneficiaries under the will, and not the person you&rsquo;ve named as executor. This avoids any question about whether a witness&rsquo;s inheritance could be "purged" for being an interested party.</p>

<h2>Notarization and Self-Proving Affidavits</h2>

<p>${notarizationRequired ? `${stateName} requires notarization for a valid will. ${s.notarization.notes}` : `${stateName} does not require a will to be notarized to be valid. A signed and witnessed will is enough. ${s.notarization.notes}`}</p>

<p>${selfProving ? `${stateName} does allow a self-proving affidavit, which is a short notarized document attached to the will where you and your witnesses swear under oath that everything was signed properly. It is optional, but it is strongly recommended &mdash; a self-proving affidavit means the probate court can admit the will without having to contact your witnesses later. ${s.self_proving_affidavit.requirements}` : `${stateName} does not currently recognize self-proving affidavits for wills.`}</p>

<h2>Holographic, Electronic, and Oral Wills in ${stateName}</h2>

<p><strong>Holographic (handwritten) wills:</strong> ${holographic ? `Recognized in ${stateName}. ${s.holographic_wills.notes}` : `Not recognized in ${stateName}. A valid will must be typed or printed and signed in front of witnesses.`}</p>

<p><strong>Electronic wills:</strong> ${electronic ? `Recognized in ${stateName} under specific conditions. ${s.electronic_wills.notes}` : `Not currently recognized in ${stateName}. Stick with a printed, physically signed will.`}</p>

<p><strong>Nuncupative (oral) wills:</strong> ${s.nuncupative_wills.recognized ? `Recognized in ${stateName} under very limited circumstances. ${s.nuncupative_wills.notes}` : `Not recognized in ${stateName}.`}</p>

<h2>How to Revoke or Update a ${stateName} Will</h2>

<p>If you already have a will and want to change it, ${stateName} recognizes these revocation methods: ${s.revocation.methods.join(", ")}. ${s.revocation.notes}</p>

<p>The cleanest approach is to draft a new will that starts with the sentence "I revoke all previous wills and codicils," then sign it with the proper witnesses. Destroy old copies when you do. Small updates can technically be done by codicil (a formal amendment), but a fresh will is usually easier to read and harder to contest.</p>

${s.special_provisions ? `<h2>Special Provisions in ${stateName}</h2><p>${s.special_provisions}</p>` : ""}

<h2>Step-by-Step: Writing a Valid ${stateName} Will</h2>

<ol>
<li><strong>Take inventory.</strong> Bank accounts, vehicles, property, valuables, digital assets, pets.</li>
<li><strong>Decide who gets what.</strong> Be specific for items that matter (names, addresses, account identifiers). Use a residuary clause ("everything else goes to...") to catch anything you forget.</li>
<li><strong>Name an executor.</strong> The person who handles your estate. Pick someone trustworthy, organized, and likely to outlive you. Name a backup too.</li>
<li><strong>Name a guardian for minor children</strong> if you have kids under 18. This is the single most important reason for a will if you&rsquo;re a parent.</li>
<li><strong>Draft the document.</strong> Our <a href="/create">free drafting tool</a> generates a ${stateName}-specific will in about 10 minutes, with all the correct clauses in the correct order.</li>
<li><strong>Print the will.</strong> Don&rsquo;t rely on a digital copy for signing.</li>
<li><strong>Sign in front of ${witnessCount} adult witnesses</strong> who are not named as beneficiaries. You all need to be in the same room at the same time. You sign first, they sign while watching.</li>
${selfProving ? `<li><strong>Sign the self-proving affidavit</strong> in front of a notary. This is optional but speeds up probate later.</li>` : ""}
<li><strong>Store it somewhere findable.</strong> A fireproof home safe is the standard choice. Tell your executor where it is.</li>
<li><strong>Review every few years</strong> and after major life events (marriage, divorce, new child, moving out of ${stateName}, major asset changes).</li>
</ol>

<h2>Common ${stateName} Will Mistakes to Avoid</h2>

<ul>
<li><strong>Wrong number of witnesses.</strong> ${stateName} requires ${witnessCount}. More is fine; fewer invalidates the will.</li>
<li><strong>Using a beneficiary as a witness.</strong> Can cause the beneficiary&rsquo;s share to be "purged" (forfeited).</li>
<li><strong>Not signing in the witnesses&rsquo; presence.</strong> The signing has to happen as a ceremony, with everyone in the same room.</li>
<li><strong>Forgetting a residuary clause.</strong> Without it, anything you didn&rsquo;t specifically mention falls into intestate succession.</li>
<li><strong>Storing the will where nobody can find it.</strong> An unfindable will is the same as no will.</li>
<li><strong>Not updating after major life events.</strong> An ex-spouse named in an old will can still inherit in some situations.</li>
</ul>

<h2>Need to Check Details?</h2>

<p>You can also read the full <a href="/will-requirements/${stateToSlug(stateName)}">${stateName} will requirements</a> and the <a href="/estate-planning/${stateToSlug(stateName)}">${stateName} estate planning guide</a> for background on intestate succession, probate, and related topics.</p>

<h2>Start Your ${stateName} Will Now</h2>

<p>The easiest way to get a valid ${stateName} will done today is our <a href="/create">free drafting tool</a>. It walks you through the questions, generates a ${stateName}-specific document with the correct clauses, and gives you signing instructions tailored to ${stateName}&rsquo;s requirements. No account, no cost, nothing stored on our servers. You&rsquo;ll have a draft ready in about ten minutes.</p>

<p>Whatever you decide, decide. A simple will is one of the most meaningful things you can leave the people you love &mdash; and it&rsquo;s one of the easiest things to put off until it&rsquo;s too late.</p>
`;
}

function generateStatePost(s: StateRequirements): BlogPost {
  const stateName = s.state;
  return {
    slug: statePostSlug(stateName),
    title: `How to Write a Will in ${stateName} (2026 Guide)`,
    description: `A step-by-step guide to writing a legally valid will in ${stateName}: requirements, witnesses, notarization, signing rules, and how to avoid the most common mistakes. Free drafting tool included.`,
    date: "2026-04-10",
    author: "I Don't Have a Will",
    readTime: "8 min read",
    category: "State Law",
    content: generateStatePostContent(s),
  };
}

const STATE_POSTS: BlogPost[] = getAllStates().map(generateStatePost);

export const BLOG_POSTS: BlogPost[] = [...HAND_WRITTEN_POSTS, ...STATE_POSTS];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = getBlogPost(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === current.category
  );
  const otherPosts = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category !== current.category
  );
  return [...sameCategory, ...otherPosts].slice(0, count);
}
