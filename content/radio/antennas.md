---
title: "Antennas"
description: "wires for the wiggllies"
url: "/radio/antennas/"
weight: 10
date: 2022-07-15T12:51:12.730Z
lastmod: 2022-07-28T22:46:42.176Z
# original author: zortness
---
A good Antenna system is a critical component in any amateur radio station. There are many different types of antennas and each type has its benefits and drawbacks.

## Compromise Antennas

***Don't panic and dont dwell too much on this one!***

The only non-compromise antenna is an isotropic radiator in free space (which is impossible to actually build, so don't even try). Every other antennas sytem makes some number of compromises for any of a number of reasons. Directional antennas sacrifice wide area coverage for gain in a particular direction. NVIS (Near-Vertical Incidence Skywave) antennas sacrifice low takeoff angles to achieve good "close in" performance. Coil loaded ,or otherwise shortened antennas, trade efficiency for compactness. With this in mind, don't worry so much about making your antenna setup "perfect" or "ideal" but, rather, try to make the best out of whatever bundle of constraints (budget, available space, available materials, HOA restrictions, etc. etc) you find yourself operating under.

# Dipole (Hertz) Antenna

The wire dipole is the most fundamental and one of the most straightforward antennas to construct. Made of two wires, 1/4w avelength long each, are connected to the center and braid of the feedline coax, respectively, and run out in opposite directions, ideally at least 1/4 wavelength above the ground. Its feedpoint impedance is within spitting distance of 50ohms so it can generally be fed directly with coax (with or without a 1:1 balun at the feedpoint). It can be mounted 'flat', as a 'V', as an 'inverted-V', as an L, or many other configurations depending on the situation. Each configuration will have different requirements for mounting (whether you need poles, convenient trees, etc.) and will offer slightly different radiation patterns. This website: has a lot of examples of dipole (and other) antenna mounting configurations and their patterns: [https://www.qsl.net/kk4obi/Standard dipole.html](https://www.qsl.net/kk4obi/Standard%20dipole.html)

## Fan Dipole

Basic dipoles are generally a 'monoband' antenna since the elements are resonant on a single band, though in some cases they may be operated on their odd harmonics (this is common with most center-fed antennas). For instance, a '40m' (7MHz) antenna is also resonant on the 3rd harmonic (7x3 = 21MHz) which is the 15m band. Extra bands can be added to a dipole antenna by attaching additional sets of radiating elements cut for the frequencies of interest, and spread out somewhat from the other elements to prevent too much interaction.

## Trapped Dipole

A multiband dipole antenna can also be constructed by adding 'traps' to the antenna elements. These traps are parallel LC resonators which present a very high impedance at a specific frequency, but are otherwise (mostly) invisible at other frequencies. Here is an example of a trapped dipole antenna for 40/20m: [https://www.dxengineering.com/parts/mfj-17754](https://www.dxengineering.com/parts/mfj-17754)

## Coil-loaded Dipole

If there is not enough space available to put up a full size HF antenna (80m dipole is 40m/135' long) loading coils can be placed near the feedpoint of a short antenna to make it appear electrically longer. These coils can be a fixed value, able to be tapped at specific points, or have an open coil which can be tapped anywhere. The tapped coils allow a single antenna to operate on multiple bands but access to the feedpoint is required to change the tap points to switch bands.

# 1/4 wave vertical (ground mounted vertical, Groundplane, Marconi) Antenna

The quarter-wave vertical consists of a single 1/4 wavelength radiator and one or more ground-mounted (or sometimes elevated) radials. The radials created a 'ground plane' which makes the radiating element behave as if there were a 'mirrored' element below the ground making up the other half of the antenna. The pattern of a vertical antenna has a large null straight up and very low 'takeoff angle' which makes it a good choice for long-distance contacts on HF.

## Multi-band Verticals

Fan, coil-loaded, and trapped vertical antennas are also a thing. Extra radiating elements (or loading coils/traps) can be added to a vertical antenna for operation on more bands without needing to make changes to the ground radials. the DX Commander ([https://www.m0mcx.co.uk/](https://www.m0mcx.co.uk/)) is probagbly the most well-known fan vertical antenna but other commercial and homebrew versions are easy to find online. Examples of a coil-loaded vertical are the Wolf River Coils Silver Bullet and the Buddipole BuddiStick.

# Non-Center-Fed antennas

As you move the feedpoint of a resonant dipole away from the center of the radiating elements the feedpoint impedance changes. in the center it is close to 50ohms, at the very tips it is a few thousand ohms, and in-between the values is somwhere in between.

## OCF Dipole

An Off-Center-Fed dipole is a multiband antenna with a single pair of radiating elements. The feedpoint is shifted a bit to one one side and placed strategically so that the impedance of the fundamental and several of the harmonics (generally 7,14,21, and 28MHz) all have similar non-50ohm impedances. This slightly higher impedance is then matched to the feedline with a 4:1 or other balun. This page explains more of the whys and wherefores: [https://squashpractice.com/2015/10/25/the-off-center-fed-dipole-antenna-design/](https://squashpractice.com/2015/10/25/the-off-center-fed-dipole-antenna-design/)

# End-Fed Antennas

Using transformers you can feed wires from the end instead from the centre (or off centre). These fall into two types-resonant and non resonant also known as the End Fed Half Wave and the End red "random" wire.

## End-Fed Half Wave

By using a 49-1 transformer (unun) you can feed a 1/2 wave dipole from one end of the wire instead of the middle. More or less performs like a dipole and will also work on even harmonics generally without a antenna tuner.

## End-Fed Random Wire

If you select a wire length that avoids 1/4 wave multiples of the frequencies you want to use and feed the wire with an antenna tuner and optionally 5,6 or 9-1 transformer you can make a relatively modest length of wire tune most or all HF bands.

# Balanced Feeder Fed Antennas

These antennas use balanced feeder, also commonly known as Ladder Line or Window Line which is an old school but very efficient way to feed an antenna. They require careful consideration as ladder line must be off the ground and avoid metal obstructions and DEFINITELY need antenna tuners to function. But they can be very flexible and very efficient.

## Doublet

This is basically a Dipole as listed above but fed with balanced line. This allows the antenna, with the aid of a tuner to be used across multiple bands like the OCF dipole and the end fed wires.
