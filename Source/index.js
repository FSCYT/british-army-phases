import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let phase;
let voiceCall;
let status;
let attendees;
let passed;
let note;
let rsm;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.clear();
  const welcomeTitle = chalkAnimation.karaoke(
    `Royal Tank Regiment Phases\n` + `Made by Looped#9967\n`
  );

  const spinner = createSpinner("Loading").start();
  await sleep();
  spinner.success({ text: "Loaded successfully!" });
  welcomeTitle.stop();

  console.log(`
${chalk.blue("HOW TO USE")}
I'll be asking you questions about the phase that you want to host
You must answer every question that is asked
If you answer it incorrectly, the output might be ${chalk.red("wrong")}!\n\n`);
}

async function askPhase() {
  const answers = await inquirer.prompt({
    name: "phase_number",
    type: "list",
    message: "Which phase are you hosting?",
    choices: ["Phase 1 - Basic Tank Course", "Phase 2 - Advanced Tank Course"],
  });

  phase = answers.phase_number;
}

async function askVoiceCall() {
  const answers = await inquirer.prompt({
    name: "voice_call",
    type: "list",
    message: "Which voice channel are you going to use?",
    choices: ["School VC", "School VC 2"],
  });

  voiceCall = answers.voice_call;
}

const Phases = {
  1: "Basic Tank Course",
  2: "Advanced Tank Course",
};

const Information = {
  1: `A **Basic Tank Course** is being hosted by <@631195457858568233>. Join to learn the basics of the Royal Tank Regiment.`,
  2: `An **Advanced Tank Course** is being hosted by <@631195457858568233>. Join to test your ability and knowledge that you've learned, **you will be kicked if you didn't complete your Basic Tank Course (Phase 1).**`,
};

function handleAnswers() {
  console.clear();
  console.log(`
**Phase ${Number(phase.match(/(\d+)/)[0])}: ${
    Phases[Number(phase.match(/(\d+)/)[0])]
  }**
**----------------------------------------------**

**[PING]** <@&1044959836229615677>
**[HOST]** <@631195457858568233>
**[LINK]** <https://www.roblox.com/games/6860385275?privateServerLinkCode=27055461848411320725891324932749>
**[INFO]** ${Information[Number(phase.match(/(\d+)/)[0])]}
**[VC]** Get into ${voiceCall}. This will be our main line of communication.
**[STATUS]** OPEN 🔓\n`);
}

async function askStatus() {
  const answers = await inquirer.prompt({
    name: "phase_status",
    type: "list",
    message: "What happened to the phase?",
    choices: ["Locked", "Cancelled"],
  });

  status = answers.phase_status;
}

function handleStatus() {
  console.clear();
  switch (status.toLowerCase()) {
    case "locked":
      console.log(`
**Phase ${Number(phase.match(/(\d+)/)[0])}: ${
        Phases[Number(phase.match(/(\d+)/)[0])]
      }**
**----------------------------------------------**

**[PING]** <@&1044959836229615677>
**[HOST]** <@631195457858568233>
**[LINK]**
**[INFO]** ${Information[Number(phase.match(/(\d+)/)[0])]}
**[VC]** Get into ${voiceCall}. This will be our main line of communication.
**[STATUS]** LOCKED 🔒
`);
      break;

    case "cancelled":
      console.log(`
**Phase ${Number(phase.match(/(\d+)/)[0])}: ${
        Phases[Number(phase.match(/(\d+)/)[0])]
      }**
**----------------------------------------------**
 
**[PING]** <@&1044959836229615677>
**[HOST]** <@631195457858568233>
**[LINK]**
**[INFO]** ${Information[Number(phase.match(/(\d+)/)[0])]}
**[VC]** Get into ${voiceCall}. This will be our main line of communication.
**[STATUS]** CANCELLED ❌
`);
      break;
    default:
      console.log(chalk.red("Failed! Something went wrong somewhere dawg!"));
  }
}

async function askAttendees() {
  const answers = await inquirer.prompt({
    name: "phase_attendees",
    type: "input",
    message: "How many people attended your phase?",
  });

  attendees = answers.phase_attendees;
}

async function askPassed() {
  const answers = await inquirer.prompt({
    name: "passed_attendees",
    type: "input",
    message: "List the people who passed the phase?",
  });

  passed = answers.passed_attendees;
}

async function askNote() {
  const answers = await inquirer.prompt({
    name: "log_note",
    type: "input",
    message: "Any notes that you want to give?",
  });

  note = answers.log_note;
}

async function askRSM() {
  const answers = await inquirer.prompt({
    name: "ping_rsm",
    type: "list",
    message: "Which RSM do you want to ping?",
    choices: ["JoshuAkino", "SpoopysSkyline"],
  });

  rsm = answers.ping_rsm;
}

const RSMIDS = {
  JoshuAkino: "<@566538789892259858>",
  SpoopysSkyline: "<@723083467847368706>",
};

function handleLogs() {
  console.clear();
  console.log(`
**[HOST]** <@631195457858568233>
**[EVENT]** ${phase}
**[ATTENDEES]** ${attendees}
**[PASSED]** ${passed}
**[NOTE]** ${note.length > 1 ? note : "Nothing."}
**[PING]** ${RSMIDS[rsm]}
`);
}

await welcome();
await askPhase();
await askVoiceCall();
handleAnswers();
await askStatus();
handleStatus();
await askAttendees();
await askPassed();
await askNote();
await askRSM();
handleLogs();