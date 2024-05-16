let markovDict = {};
let wordsThatEndWithDot = [];
let currentWord;

function setup() {
  textToMarkovDict();
}

function draw() {
  background(220);
}

function textToMarkovDict() {
  const textArray = text.replaceAll("\n", " ").replaceAll("  ", " ").split(' ');
  for (let i = 0; i < textArray.length - 1; i++) {
    if (textArray[i] in markovDict) {
      markovDict[textArray[i]].push(textArray[i + 1]);
    }
    else {
      markovDict[textArray[i]] = [textArray[i + 1]];
    }
  }
  if (!(textArray[-1] in markovDict)) {
    markovDict[textArray[-1]] = [];
    wordsThatEndWithDot.forEach(word => markovDict.push(...markovDict[word]))
  }

  Object.keys(markovDict).forEach(word => {
    if (word.endsWith('.')) wordsThatEndWithDot.push(word);
  });
  currentWord = random(wordsThatEndWithDot);

  console.log(markovDict);
}

function generateNextWord() {
  return currentWord = markovDict[currentWord]
}

const text = `1
In a way, Oko pitied the big hunter struggling to break free from the net of thorn-laced vines. The fey limped around a mass of seething vegetation, admiring his handiwork: its flexibility, strength, and ability to regrow with such speed and vicious energy. A good thing, too, given the size of the stranger who had come within a hair’s breadth of murdering him. The man’s rusty helm covered his hair and the top half of his face, making him look all grimace and teeth.
What a brute! The hunter seemed larger now than when Oko had first realized someone was stalking him through an otherwise pleasant forest on a plane whose name he did not yet know. The size difference wasn’t because night had fallen and a full moon changed how objects looked within its glossy light. Magic was afoot.
The veins visible beneath the man’s pallid skin were streaked with darkness. Blood trickling from a hundred scratches on his body where thorns tore his skin flowed a noxious black, corrupted with a foul rot. Certainly he smelled rank with dried blood, mud, and substances Oko did not care to reflect on. The matted cloak and filthy clothes held enough stink to slaughter a more sensitive nose than his own.
“I am surprised I have to point this out to you,” said Oko in his most reasonable tone, “but you cannot rip the vines as fast as I can grow them. You’d be better off not wasting your strength in fighting them.”
“I’ll rip you apart with my bare hands,” growled the beast.
“A vile and predictable threat I am sorry to hear you utter. But I understand your frustration. It’s no wonder you launched yourself at me, an innocent visitor just passing through, and tried to kill me.”
Of course the creature had no appreciation of irony. He growled with a hostility that felt…odd and exaggerated, almost artificial, as if his seething anger was part of the darkness that corrupted his blood.
Oko paused at the hunter’s right side. A lump bulged beneath the skin between spine and shoulder. It throbbed not audibly but in a way attuned to his magical sense. He recognized the signature of its dense power with a jolt of uneasy surprise.
The hunter had a shard of hedron embedded in his flesh. Few knew of the existence of hedrons. Fewer still possessed the magic to perform such an operation. Oko certainly did not.
Who was this hunter? Why was the hedron implanted under his skin, and who had placed it there? So many questions that needed answers.
Oko finished his perambulation of the magical cage of thorns and vines, judging it able to hold for now. Using both hands—the weapon was astoundingly heavy—he dragged the huge axe the man had been carrying until it lay out of range of an easy duck-and-grab, just in case the beast did break free.
Only then did he examine his own injured leg. The cut that had torn his flesh down to the bone was already starting to knit together. He’d had the presence of mind to shift into the shape of a stag and thus confuse his pursuer for long enough to bolt out of reach. Then he’d been able to shift back and entangle the man in vines. But as he well knew, corruption can always insinuate its tendrils into the purest ground. His vines might already be becoming blighted and would give way as the man’s tainted blood weakened them. Unbound, the man could easily kill him. He didn’t dare attempt his usual means for ridding himself of a dangerous foe. To do so, he’d have to touch the beast and risk coming into contact with the tainted darkness writhing within the hunter’s flesh.
The best action in this case was a swift departure.
Yet survival usually depended on knowing more than your enemies did.
“So what is it you want, my unexpected friend?”
“To kill you.”
“Why? Is it my exceptional good looks? My wit and intelligence? My pleasingly mild disposition?”
The brute made a sound that might have been a grunt of annoyance or possibly a bitten-off laugh. “Do you think I can’t kill you?”
“If you could reach me, you certainly could. But forewarned is forearmed. Or four armed, if I decided to take the form of an Elagian swamp swallower. But that wouldn’t be a good choice for a highland forest, would it? So I fear we must say goodbye to each other before any such disagreeable episode comes to pass. Not the swamp swallower, I mean, though they are disagreeable, dangerous to magic users, and fetid to boot, rather like you. Killing me is what I mean. You’ll understand why I’d prefer that not happen.”
“You talk too much.”
“A fair assessment. Well, I am no more eager to see your ugly face again than you are to hear my mellifluous voice. So, to spare your ears and your volatile disposition, I will bid you fare well rather than good riddance.”
The brute said, “I can follow you anywhere.”
“Anywhere?” Oko paused before he planeswalked away from the quiet forest.
“You cannot hide from me. Another world, another trophy.”
His eyes narrowed. “Now you begin to interest me. Are you saying you are also a Planeswalker?”
“I hunt Planeswalkers.”
“Have you some reason?”
“They keep coming after me. If I kill all Planeswalkers then I can hunt in peace.”
“My friend, your logic is flawed, if you are also a Planeswalker.”
“Don’t mock me, pretty boy.”
Oko raised both hands in a hands-off gesture. “I’m not mocking you. Far from it. You have lit the fire of my curiosity. A corrupting magic courses through your flesh. A hedron lies buried in your skin. You’ve admitted to being a Planeswalker, determined to hunt me from one world to the next when you don’t even know me, just because I am also a Planeswalker. A vendetta, if I am not mistaking the matter, but surely not one directed against me specifically since we’ve never before met. Is there anything else you’d like to share with me? Your reasons? Your secrets?”
The hunter grunted, trying to get his hands free. The thorns tore his skin but the pain mattered not at all to him.
“I’ll kill you,” he muttered. “I will follow your trail until you’re dead.”
A shadowy tendril of the corruption had slithered its way into one of the vines, which was starting to turn brown. Oko frowned. The rot would spread, and the man would break free no matter how many vines he wrapped around him. This was a powerful curse, indeed.
Power could be fought. It could be fled. Sometimes it could be bent to another’s will. He sighed but saw no way around attempting the most draining of his magics. If the hunter really was a Planeswalker, it wasn’t worth taking the chance that he couldn’t track him across the multiverse.
He took a step closer. The hunter strained, trying to reach him. Oko pinioned the thorn-wrapped brute’s gaze with the full force of a magic that long ago had allowed him to escape his persecutors: a meager spoonful of telepathy he’d taught himself to turn another to a better purpose with the aid of a sympathetic smile, a glimmer of comradely hope, a promise of unshakeable loyalty.
“Vendettas are a grievous burden to bear, are they not? I pity you, my friend. There’s so much pain in your heart.”
The man growled hoarsely. “I don’t need your pity.”
He held the hunter’s eyes, didn’t let them shift away. With all the force he had to bear he dug deep past the hostility, the rage, the agonized sense of betrayal. It was so hard to get there, sweat breaking out on his forehead, pulse thundering in his ears. Deep in the man’s mind he discovered a deeply-hoarded grief for a father lost along ago. What an innocent dupe! Fathers always betrayed their sons.
“What do you need?” he said, pressing deeper into the ancient wound.
“I need more,” the man whispered, panting as if he were running. But Oko’s glamer was a foe he could not out-race.
“You are suffering alone, my friend. Share your troubles with me.”
The man was strong, it was true, but his strength lay in his muscles, his endurance, his axe, and his impressive tracking ability. His will was a polished spear aimed at its target, but his disordered mind had a fragile texture.
“Liliana Vess,” he whispered, the words torn from an unwilling tongue.
For an instant Oko’s control wavered out of sheer astonishment. “Liliana Vess.”
“She cursed me…the darkness…the rot….” Corruption pulsed into the vines with a surge of anger. The vegetation began to weaken as the man struggled again.
Oko drilled down, choking off the man’s emotions, wrapping them in a numbing cage. As magic dulled the clawing edge of animosity, the brute’s shoulders dropped in resignation. His hands opened to hang loose at his side. His lips parted slackly, and not a sound came out.
“I’ll help you. You can trust me. I am your only friend.”
As the hunter’s struggles ceased, his mind gave way beneath Oko’s mesmerizing stare, surrendering to the beautiful, dreaming lie of comradeship and compassion.
The spell was complete.
Oko wiped his damp brow. He was shaking with exhaustion, shaken by being thrown back into hideous memory. The same technique had been used on him long ago before he’d turned the tables on his captors. The frightened boy in him hated inflicting this on others. Yet in a cruel Multiverse a person had to use the weapons they possessed to save themselves. People were capable of any awful thing, always filled with their own sanctimonious rationalizations for why they were good and their enemies were bad. Planeswalkers were the worst of an already bad lot. Power did that to people. Especially to people he meant for the time being to avoid, until more of his plans could be put in place.
Meanwhile, what was he to do with a creature who could pursue him across planes and would kill him if he ever got close enough? Should he hack the man into small pieces, now that the hunter languished under his spell? Or use the man to protect him as he went on his way? A shield would prove useful. A first line of defense when, for example, the unexpected ambushed him in an isolated forest where he’d been minding his own business.
“What is your name, my friend?” Oko asked with a kind smile, but before the hunter could answer he shook his head. “No, you don’t want to remember your name and every terrible detail you associate with your past, do you?”
The hunter bowed his head. “No. I don’t want to remember.”
“Let go of the past. You will walk a new path. Explore a new destiny. I need a bodyguard. You need a better sense of purpose, one that my quest will provide. I’ll call you…Dog, and you’ll call me Master. Yes, Dog?”
The man stiffened, then gave way all at once as if he was too weary to fight on and just wanted to rest. He bent his head. “Yes, Master.”
The brute looked so much more at peace that Oko was pleased. Inflicting suffering on others was the tool of weak-hearted bullies. It worked so much better when people wanted to be helped. He smiled as he curled the vines away to release the man. He even allowed Dog to pick up the big axe.
“Let us leave this dull wilderness behind. You and I, my friend, will together seek rule-bound tyrants to overthrow, pious frauds and smug deceivers to unmask, and hypocritical liars to expose. If a few Planeswalkers must meet their end, should they attempt to interfere with me as I better the lives of all, so be it. They will have brought it on themselves.”
The hunter’s eyes sparked with a glimmer of his earlier savagery. “Yes, Master.”
Rowan impatiently surveyed the forecourt of Castle Ardenvale, searching for a glimpse of her brother Will. He should have been waiting for her beside their ponies, which were tied to the back of a wagon filled with sacks of oats. The High King was about to leave on the Grand Procession, his first-harvests tour of all five courts of the Realm.
Their parents had made a deal with the twins: Act as humble attendants in the baggage train serving the community, and you may accompany the procession. But of course moonstruck, lamb-witted Will had gotten bored of waiting and wandered off. She and her twin were going to be left behind, the gates would be closed, their mother would lecture them that rules were meant to be followed, and they’d lose their chance to go.
Her anger flared. Lightning crackled at her fingertips, but she damped it down, letting the magic chase away like a flurry of nettle stings along her skin. The pain sharpened her thoughts. Think, she told herself. Stop and think.
Maybe Will hadn’t wandered far. The procession hadn’t left yet because they were waiting for the High King to join them. Even once the column started moving it would take a while for everyone to file out. She could still find her brother in time.
The forecourt was packed with people and animals. Knights, nobles, mages, grooms, attendants, and wagon drivers waited on the inner causeway behind closed gates that would open onto the long outer causeway that linked the promontory to the surrounding countryside. The silver and white tabards of the assembled travelers shone in the sun in disciplined ranks. Even the horses waited more patiently than Will could.
The many patient horses reminded her that her best friend wasn’t mounted on a youth’s training pony today. Cerise had turned eighteen two months ago.
Rowan checked to make sure the reins of her tediously placid pony were secured to the back of the wagon. Her unobtrusive tunic and leggings covered by a forest-green traveling cloak allowed her to move unnoticed alongside the waiting column until she spotted the four healers who were accompanying the Grand Procession.
She slipped closer. As the youngest among the healers, Cerise stood modestly behind her elders and beside her mount. Seen in profile, her grace and beauty matched that of her bearded unicorn, her own black complexion set off by the unicorn’s silvery-gray coat. Rowan didn’t want to call attention to herself so she glared at Cerise’s profile until the other girl blinked and looked around right at her. The healer whispered something into the ear of the unicorn, then glided over to Rowan without a word to her elders, who were talking among themselves.
Coming up, she set hands on hips and cocked her head to one side. “Why aren’t you back with—?”
“Is Will with you? Did he come by?”
Cerise gave a quick look around. “Did he get bored and wander off? How like Will.”
“Easy for you to say. You’re finally leaving on your first quest.”
“It’s just four more months for you, Rowan. I’ll be back by then. We’ll ride out together.”
“I thought I was going to be able to scout out the different courts, get the lay of the land before I go on my first quest.”
“Weren’t you with Will this whole time in the baggage train?”
Rowan exhaled, then bit her lip.
“Ah,” said Cerise with a triumphant smile. “What were you doing?”
“I didn’t leave the forecourt! I was talking to Titus. He just got back from—”
Cerise interrupted with a laugh. “Of course you wouldn’t have been able to resist a chance to hear about the tournaments at Embereth.”
“I know, I know. I should have stuck next to Will the whole time instead of—” Anger boiled freshly up in her belly.
“Instead of wandering off to flirt with the only person from our cohort who can regularly defeat you at swordwork?” Cerise smirked.
“Ugh, I hate it when you’re right,” Rowan said without heat. “I didn’t realize it would be so hard to see my friends go off on their first quests while I’m still mired here.”
“Will can’t have gone far, maybe up to the battlements.” Cerise punched her on the shoulder. “Good fortune finding him. As soon as the High King arrives we’re leaving. You know what happens when the gates close.”
“The gates always feel closed.” She gave a frustrated wave to Cerise and hurried over to Archer’s Tower, nimbly avoiding collisions with onlookers who were starting to mill around restlessly. Of course the assembly must be gathered before the High King joined them, but he tended to run late.
Rowan took the tower stairs two at a time. Up on the battlements, banners snapped in the cheerful wind. It was a clear day with a few high clouds brushing like feathers along the sky. The neat checkerboard fields of Ardenvale’s farms and villages surrounded the castle’s promontory at the edge of the Arden, the highlands which gave the court its name. Silvery woodlands lent a magical aura of peace and calm to the landscape. The outer causeway spanned a wide moat before joining up with a road paved in white stone. A road that led somewhere else, anywhere else.
The yearning hit hard. She and Will had not yet been allowed beyond the border of orderly, peaceful, deadly dull Ardenvale. Out there lay the Realm in all its glory and the Wilds with all its danger, and she wanted to go. She had to go. Lightning sparked again in her fingers. A guard turned, sniffing the air as he caught the scent of ozone. She curled her hands into fists. The pain of the magic biting back into her flesh she could endure, but not the dreary tedium of getting stuck here while all her friends quested forth.
There was no sign of Will on the wall walk.
Where would he go?
Bright horns blew to announce the imminent arrival of the High King and the Queen. The restless onlookers tightened up their disorderly rows.
She abruptly spotted Will’s blond head in one of the gardens planted between the battlements and the inner causeway. He was standing on a little circle of lawn as if he had all the time in the world to contemplate each blade of grass. How like Will.
The horns sang again. The doors into the inner court of the castle opened. High King Algenus Kenrith and his beloved Queen Linden emerged, accompanied by the younger two of their four children. Her mother’s hand was clasped in her father’s, like always. They were so in love even after all these years. It was a little embarrassing. But at the same time their constancy made Rowan feel sheltered and secure—and also stifled! They’d already had their legendary adventures, and hers were evidently never going to start.
Rowan hammered back down the tower steps, brushed past several startled guards on the lower level, and bolted out through an open guard door that led into the garden. She ran down one of the gravel paths, realized she’d gone the wrong way, and raced back with pounding heart and ragged breath past a screen of flowering dog rose. Will stood with his white hands braced on either side of a stone birdbath. He was staring down to where his fingers touched the water.
“Will!” she shouted.
He gave no sign of having heard her as she sprinted up. She slapped a hand on his shoulder. When he didn’t acknowledge her, she glanced down at the shallow pool. Her breath caught.
The surface of the water was skimmed over with a sheet of ice despite the summer heat. Nothing unusual in that, since ice was Will’s magic. But the ice glimmered with a weird, mirror-like sheen. The shadow of a vista shimmered into view beyond the surface, as if she and her brother stood on a high pinnacle and looked onto a place so distant all they could see was a bleak landscape of shifting sand dunes over which glowered a bloated moon
The scene shivered as if a ripple ran through it, and when the surface settled back into stillness they saw
a massive dragon’s skull
and then, as if the pages of a codex were being flipped to a different place,
a figure obscured by shadows crouched on a massive branch
and then
a host of brightly armored knights spreading their shining wings
“Will!” She shook herself free of the alluring visions, grabbed his arms, and yanked him bodily away.
The ice dissolved.
He yelped. “Rowan! Ouch! Let go!”
“Huzzah! Huzzah!” Happy cheers of acclamation rose from beyond the wall.
“They’re leaving! Will! We have to go!”
He stared at her with those big muttonhead eyes. “What? Oh! Why didn’t you say so?”
“Shut up and run!”
She raced back the way she’d come. He followed, keeping pace easily. They’d make it just in time…or so she thought until the guard door to the tower came into view. Ardenvale was an orderly place: Strict adherence to the rules was necessary to combat the threat of the Wilds and its unruly, perilous, lethal denizens who could never live in peace with the Realm. When the gate onto the outer causeway was opened, any interior gates off the inner causeway were closed.
They were locked out of the forecourt and into the garden.
She pounded her fist on the iron-banded door. “Hey!”
Will grabbed her wrist before she could hit the door again. “You’ll just hurt yourself. It’s barred from inside. They won’t open it. We climb the lattice like we always do.”
“It’s too far, we won’t make it.”
“Sure we will,” he said with the annoying optimism he flung around when they’d landed in an impossible situation.
They raced around to the back of the garden where they could climb an ivy-covered trellis up to the courtyard of bread ovens and then back through the summer kitchens and then down through a set of linked passages through the oil and grain storerooms and of course, of course, of course they were too late. They ran panting onto the inner causeway as a last fanfare of horn blasts sounded. The procession was gone. The outer gates were closed. Onlookers chatted merrily as they left, too busy to pay any mind to two harried-looking youths dressed in workaday clothing.
Rowan bent over, hands on knees, panting. She would have cried if it could have done her any good, but since it wouldn’t, she didn’t.
Will wasn’t even short of breath.
“We missed them!” he said in his most obnoxiously buoyant voice. Like their father, he had the annoying trait of remaining untrammeled by setbacks. “They even took our ponies with them.”
“You missed them! You did!” she accused him. It was unfair to lay all the blame on him, but she was just so mad. “You made me miss them! How could you?”
He glanced at the sky. “Usually processions don’t leave until midday so in a way they left early. I didn’t want to stand around waiting like we always have to do. And anyway, Ro, I had this…I had a strange feeling like when a wick tries to take a flame and doesn’t quite light, and then I knew if I could make a mirror it would show me something. You saw it. All those places—”
“Yes, I know! Places I will never see because you couldn’t just stand and wait for once.”
“I…I don’t think those places were in the Realm, Ro.”
“Or the Wilds. It doesn’t matter for you. You like Ardenvale. You’re happy here. But I’m not. You know Mother won’t let me go alone, I’m always saddled with you. For once I just wish I could leave you behind, you useless, wool-gathering birdbrain.”
“Birds are very intelligent.”
“Then I take back the comparison!”
“I thought I recognized your voices, children. Do not squabble in public, if it pleases you.”
Rowan straightened, all the air punched out of her lungs by the sound of that dignified voice. She and Will turned as if held on one string to face the serenely august Queen Linden. She was clad in a magnificent silver and white robe whose sleeves were embroidered with the circle-bound flame of Ardenvale, the keyhole of Vantress, the goblet of Locthwain, and the hammers of Garenbrig to mark the courts where she had achieved knighthood.
They both gave a bow, touching right hand to heart, as was customary for younger people greeting their elders. The queen’s right eyebrow nocked to a new height of skepticism and dissatisfaction.
But all she said was, “Attend me.”
Their little brother—not quite four—grasped Rowan’s hand immediately. Erec had his morose face on, thumb in mouth as he sulked the way he always did whenever their father rode off on his kingly duties. Rowan wiggled his hand to get his attention. When he looked up, she tapped her lips as a reminder that thumb-sucking wasn’t to be done in public. With great reluctance he popped the thumb out of his mouth and sighed as if no light would ever again be seen in the world. A tear slid down his face as his lower lip trembled. Rowan picked him up and settled him on her hip.
Their younger sister never suffered in silence or for that matter observed any situation without feeling she needed to remark on it. She fell into step, elbowing Will and pulling a face as she whispered, too loudly, “Why are you two still here?”
“Hazel,” said their mother in her firm, calm voice, “don’t you have obligations at the stables?”
Hazel mouthed, “I bet you’re in trouble,” and glided off with all the poise of a confident eleven-year-old.
The queen processed onward in a stately manner, never any hasty or precipitous actions for her. As they climbed the stairs into the entry hall, courtiers and attendants approached bearing urgent reports. Each had to be addressed immediately or put off until next month’s high court tribunal. The nearby hamlet of Wealdrum appealed for aid after their grain crops had been trampled and a farmer mauled by a malicious swarm of redcaps. In the town of Trekell, a massive golden egg had plummeted out of the sky on market day, crushing merchants’ stalls and causing multiple injuries and deaths as it rolled through the central square, and a dispute had broken out over how the proceeds of the calamitous egg should be divided. In a different canton, a steward had accused a villager of theft while the man claimed it was blue faeries, not he, who’d pilfered the keys to the strongbox.
Will walked behind their mother in composed silence while Rowan fumed, turning the morning’s disaster over and over in her head. Cerise had been right, of course. She should never have given in to her urge to find out more about Embereth’s tournaments and to flirt with Titus while she was at it. This fiasco was as much her fault as Will’s.
Maybe they could talk their mother round. Other youths were given second chances.
At length they escaped the audience halls and public rooms to enter the privacy of the modest apartments within the castle where the royal family lived. Erec had fallen asleep with his head on her shoulder. She carried him into the cramped bedchamber shared by the two boys, laid him on his bed, and took off his shoes. When he was settled, still fast asleep, she hurried back into the parlor.
Their mother had seated herself in a chair and was patting at her forehead and cheeks with a linen kerchief.
“Does it seem hot to you?” she asked in a mild tone at odds with the sweat beading on her skin.
Rowan shot a disbelieving glance toward Will. It wasn’t a hot day, and anyway the thick stone walls kept the interior cool. He merely gave her a shake of the head, so she went over to unbind the protective amulet that latched the shutters and opened them. The parlor resembled the tidy front room of the farmhouse where young Linden had grown up in the canton of Kenrith. The round table was well worn and painstakingly polished. Cushions on the chairs were the one luxury allowed. A tray bearing a covered pitcher and cups sat on a side table. Will poured out a tisane of rose-hips and took the cup to their mother, who gave him an appreciative nod before drinking.
Rowan craned her neck to look outside. From up here she could see where the outer causeway reached solid ground and the main road. The tail end of the Grand Procession had cleared the causeway, the rear guard’s banners bobbing away. She squinted but couldn’t make out Titus’s distinctive red hair from this distance. A column of wagons was headed up the causeway toward the main gates bearing supplies for the castle.
She turned away from the window. “Mother. We’re really sorry, and we know it was thoughtless of us. But I see supply wagons coming in. If we go right now we can slip out when the gates are opened to let them in. The procession doesn’t move fast so it won’t take us long to catch up. Probably no one will realize we weren’t with them all along.”
“I did not give you leave to speak, Rowan,” the queen said in the same even voice with which she addressed any person of the court.
“But Mother—!”
“What did I say, Rowan?” Setting down the cup, the queen gestured for the twins to stand before her. “Here in the Realm we live according to the reign of the five virtues. Peace and order are secured by loyalty, knowledge, persistence, courage, and strength. We respect and revere the virtues but we do not worship them. We strive to prove our worthiness. As High King, your father is held to an even stricter standard.”
Her gaze slid from Rowan to Will and back to dwell a moment longer on Rowan, her lashes flickering with a flutter of emotion that made Rowan wince.
“For all that we attempt to raise you in an ordinary manner, you are always in the public eye, and your behavior—even commonplace mischief—will be seen as reflecting on our stewardship of the Realm.”
Rowan opened her mouth to protest just as Will, anticipating her, pressed his right foot atop her left to remind her to keep silent.
The queen met her daughter’s gaze to acknowledge the unspoken complaint. “It is nothing you asked for, and is not fair to you, but because you are our children, it is what you must live with. Youths in Ardenvale—indeed in all the courts—claim the right to travel to the other courts on their first quest when they reach eighteen. Not before. As your father and I have impressed upon you two time and again, we cannot favor you and give you opportunities others do not have. Why is that?”
Rowan let Will answer. He never sounded sarcastic or disparaging no matter how many times their mother had given them this lecture.
“Long ago the elves ruled the Realm. They were proud, arrogant, vain, and cruel. Worse, they allowed any sort of unsavory magic to flourish unchecked. They said that those who were too weak to defend themselves could bend their knee to the more powerful in exchange for protection.”
The queen nodded. “All we have ever wanted in the Realm is peace, harmony, and justice. For all that the elves claim we have injured them, they continue to allow any sort of unsavory magic to flourish unchecked in the Wilds no matter who it harms.” She paused to sip at the tisane, voice touched with a sudden hoarseness.
Rowan bent her head, her anger ebbing. Their mother rarely drew attention, however obliquely, to the tragic circumstances of Rowan and Will’s birth. She must be more upset than Rowan had realized.
“What lesson have we learned from the past, Rowan?
“It’s easy to be born on the top floor of the castle and claim you are better than a villager born in a humble farmhouse.” As Rowan repeated the rote words she knew were expected of her, she nevertheless found herself warming to her subject. “But you and father were both born into ordinary families. Yet the Questing Beast chose you two to attempt the High Quest, not any noble’s child. Father became High King because he became a knight at all five courts. And you would have too if—”
The queen raised a hand to halt Rowan’s impassioned speech. “As your mother, I am grateful my children are proud of me. But as your queen, I must admonish you. Favoritism and arrogance go against all we strive to uphold. That is why your father and I must hold our children to a higher standard. That is why—”
She broke off, her voice gone a little ragged, and took another sip of the tea. Will nudged Rowan’s foot and gave her a look, his mouth twisted down to scold her.
She twisted her face in an answering grimace worthy of Hazel.`