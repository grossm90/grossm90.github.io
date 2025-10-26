+++
title = 'Building a Classroom Server: Origins'
summary = 'The first steps on a long journey to ultimate control of my classroom.'
date = 2025-10-26T10:35:00
draft = false
tags = ['Primus', 'Linux', 'server', 'computer-lab']
+++

> THINK OF IT AS LITTLE TOY BLOCKS
> ON GREAT BIG STEROIDS
>
> —— Sim City 2000 Ad, 1995

## The Dream

At the end of the 2023/24 school year, I was informed that a grant for a new computer lab was approved and that I would be the lucky teacher who would get to call it home. The grant would supply forty computers, two monitors each, articulating stands for said monitors, an 80" touch-screen display, as well as furniture to keep everything off the floor.

This, of course, was great news as I was in a typical classroom with regular desks, a laptop cart, and a low-definition projector from the early 2000s. A dream room, however, begets a dream networking setup, and my imagination shot into overdrive.

One specific pain point for CS teachers is managing student workstations in a way that balances access to contemporary software for students while maintaining a secure environment for the school.

One solution to this pain point is to host a LAN server in the classroom that has no internet or school network access. This gives the teacher ultimate control and flexibility over the workstations while ensuring the school's and students' data are protected. The downside, of course, is it's a ton of frick'n work. If you're interested in creating something similar for your computer lab, you can click on the "Primus" tag at the bottom of this post, which is the nickname I've given to this project.

## The Plan

The ultimate goal is to,

Have an Ubuntu server with the following software:

- FreeIPA - for managing accounts
- Veyon - for monitoring student machines and screen-sharing
- Moodle - for hosting assignments and quizzes
- GitLab - for hosting code and teaching students modern versioning workflows

And forty Linux Mint clients with the following software:

- Visual Studio Code - for writing code
- BlueJ - for planning, debugging, and compiling Java projects
- Processing - for creating visual Java "sketches"
- PICO-8 _†_ - for developing simple "retro" games
- Godot - for developing complex "modern" games
- Blender - for 3D modeling
- Ardour - for making music
- Aseprite _†_ - for making pixel art
- GIMP - for making digital art
- Docker - for running the CS50 Codespace container
- CS50 Codespace - for CS50AP student code

_†: This software is not free, but educational licences are available_

### Risks and Challenges

The largest challenge is the time investment, as the server must be configured from scratch. I am not experienced in networking, so even simple things like configuring IP addresses and DNS settings all have to be researched. Student accounts must be created in FreeIPA and given the correct permissions, all with the understanding that a small subset of students are both clever and malicious, and may try to undermine my system. A robust backup system has to be implemented from day one with regular syncs in the case that, whether by accident or on purpose, the server crashes irrecoverably.

Additionally, because the entire system must never connect to the internet, I have to

1. Measure, cut, splice, and run forty Ethernet cables throughout my lab
2. Download all of the software off campus and upload it to the server manually

Number two is particularly challenging, as I do not have a lot of experience with the inner workings of package managers such as apt, so I will have to research how to host a local instance of apt on the server that the clients can then download from.

The summer is not long enough to set everything up in time before the next school year starts, so a plan for a minimum viable version must be in place.

Finally, the school district, at any time with no notice, may tell me that I am not allowed to run Linux on the computers. I have secured permission to do what I am doing, but it is worth remembering that it is in the nature of large bureaucratic institutions to revoke permissions like these on a dime. A teacher's classroom does not actually belong to them, as we've seen in Idaho with the "Everyone Is Welcome Here" poster incident. A backup plan to teach all of my curriculum through district resources must also be in place.

### The Roadmap

This roadmap is obviously fluid and subject to change, but here are the broad strokes:

1. Set the classroom up to be ready on day one of the 2025/26 school year
2. Create a Linux Mint image that will suffice until the server is ready
3. Mount the network switch and run the cables
4. Configure the server and test on a single client
5. Roll out with the entire lab

At the time of writing this, I am in the seemingly bottomless valley between steps two and five. All forty computers are running Linux Mint with VS Code, PICO-8, BlueJ, Processing, and Docker with a CS50 Codespace container, but don't let me skip ahead. How has this roadmap progressed thus far?

## Step One: Set the Classroom up for 2025

Things did not get off to a smooth start. Heading into the summer of 2025, only ten of the forty computers arrived on campus. The furniture had been delivered months ago, but only one quarter of the PCs had arrived, and the 80" display for the front of the classroom was also MIA. I had hoped to spread the load of setting up the room throughout the summer, but this could not happen until the computers arrived.

Fast forward to Monday, July 28th, 2025, the week before the teacher pre-planning week, and only ten more computers had arrived; half of what was purchased. Either way, I had to get started, so I began unboxing all of the new PCs and monitors and set them up on the left side of the room, then I took half of my old computers and set them up on the right side. The new monitors, beautiful 23" Thinkvisions, needed to be screwed into their bases. They do not clip in like my older monitors did, and thus required an entire day to assemble.

## Step Two: Create A Linux Mint Image

It was now Wednesday, and with two different computer models in my lab, I would have to create two different images because the drivers were not compatible between models. I finished Wednesday evening with an image that would work across my older PCs, saved to a thumb drive using Clonezilla.

I started on Thursday morning by creating the image for the newer PCs. All goes well and I finished by lunch time, where I am surprised by... the delivery of the other half of the new PCs. So. After my lunch, I set up the new PCs and started re-imaging them using the thumb drive I set up the day before. I got four done before calling it a day.

I don't typically like asking others for help, but the situation was dire. I needed the rest of the lab imaged before the weekend, because I had to be in Miami during the pre-planning week, as I was scheduled to teach a Professional Development class. Thankfully, my wonderful girlfriend agreed to help with the tedious task of re-imaging the thirty-six other computers, and we finished just in time. _She may or may not have understood how boring re-imaging computers is before agreeing._

The success was bittersweet, however. The 80" display had still not arrived, and the image I had created was a lackluster stopgap to my ultimate goal of a fully featured server. Regardless, the show must go on, so I borrowed another touchscreen display from the Media Center and set my focus on the PD I had to teach after my much-needed weekend.

## Step Three: Mount the Network Switch and Run the Cables

After a few weeks of running around with a thumb drive to distribute assignments and collect student work, I was really eager to do whatever was in my power to get the server up and running. I purchased an RJ45 splicing tool and cable tester with my own money (thankfully, my school has multiple spools of CAT6+ cable and RJ45 connectors that I'm free to use) and hit up YouTube for a tutorial. I messed up my first connector, but otherwise got the hang of it quickly. I then taught a handful of trustworthy students how to create the cables to spread the load.

The switch is a Ubiquiti 48-port Gigabit network switch. It is rack-mounted and will live in a 2RU wall-mounted rack on the left side of my classroom. As mentioned previously, the cables will be custom cut, then zip-tied in groups that match each row of desks, then anchored to the wall with zip-tie anchors.

## Step Four: Configure the Server

The server was a Dell PowerEdge 1950 that was donated by a very generous teacher at a neighboring school. I say _was_, because this server was manufactured in 2002. It has dual 1.6 GHz, 64-bit Xeon processors, is capable of supporting 32 GB of RAM (albeit DDR2), and has two drive bays that support SATA SSDs. These specs are _probably_ more than capable of handling what I need from it, but, being the tech nerd that I am, FOMO set in quickly. The 1950 are _very_ large and _very_ loud. The final straw hit the camel's back when it refused to load the GRUB screen for the latest Ubuntu server version (24.04.3). It's not a total loss for the PowerEdge, though. It will serve as a game server for my after-school E-Sports club.

On Rosh Hashanah, September 23rd, I used my day off to call AVA Direct, and the _super_ helpful representative set me up with something more contemporary.

This mostly brings us to the present day. When the new server arrives, I'll draft my next post with the specs, my first attempts at getting FreeIPA configured, and next steps.
