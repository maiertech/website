---
id: BbEYnN-1c5Q
title: The state of European hosting alternatives
description:
  Is European hosting ready for your web app in 2026? I compare 7 options for solo devs and small
  teams, from bare VPS to PaaS, and pick a winner.
aspectRatio: '16 / 9'
publishedDate: 2026-03-13
---

Europe is pushing back against its dependence on US Big Tech. But how realistic is it to actually
host a web application with a European provider in 2026?

In this video I cover options for solo devs, small teams and big teams: from bare VPS to PaaS, and
everything in between. I look at developer experience, scaling, pricing, and lock-in risk.

European hosting has come a long way, but is it ready for your web application? Let's find out
together in this deep dive into the state of European 🇪🇺 hosting.

#WebHosting #DigitalSovereignty #DockerHosting #BigTech

## Links

- Links to European hosting providers (in the order they were mentioned):
  [Scaleway](https://www.scaleway.com/en/), [STACKIT](https://stackit.com/en),
  [OVHcloud](https://www.ovhcloud.com/), [UpCloud](https://upcloud.com/),
  [Hetzner](https://www.hetzner.com/), [Centron](https://www.centron.de/),
  [Netcup](https://www.netcup.com/en), [Sliplane](https://sliplane.io/),
  [Upsun](https://upsun.com/), [Clever Cloud](https://www.clever.cloud/),
  [Scalingo](https://scalingo.com/), [Stackhero](https://www.stackhero.io/en-US/),
  [Koyeb](https://www.koyeb.com/), [Bunny](https://bunny.net/)

- Links to other services (in the order they were mentioned): [Railway](https://railway.com/),
  [Coolify](https://coolify.io/), [Dokploy](https://dokploy.com/)

## Timestamps

```
00:00 Introduction
01:15 European alternatives for what exactly?
02:36 Why do web developers love Vercel & Co.?
03:56 European serverless functions
05:55 Lock-in and Docker containers
07:02 Reference: Railway
11:17 Docker hosting at scale
13:01 Focus on solo devs and small teams
13:33 Option 1: VPS
15:06 Option 2: VPS with Coolify
17:10 Option 3: Sliplane
18:53 Option 4: Upsun
20:19 Option 5: Clever Cloud
22:08 Option 6: Koyeb
25:36 Option 7: Bunny
29:18 Conclusions
32:28 And the winner is...
```

## Transcript

### Introduction

Hi everyone, in this video I'm looking at the state of European hosting alternatives.

Here in Europe, we're in the middle of a political discussion about our dependence on US Big Tech.
That's not only in the private sector, but also in government. So here in the Netherlands, our train
system depends on US Big Tech. And also a lot of government services use US Big Tech for hosting. So
naturally there have been political calls to lower that dependence and to get more self-sovereign in
Europe.

But I, as a developer was asking myself, how realistic is it to move a web application in 2026 to a
European hosting provider? And that's exactly what we're going to look at in this video.

So for this video, I assume that the application that we're trying to host is a real web application
that requires some code to be run on a server. So we're not looking at static hosting, because
static hosting is also a problem that's very easy to solve, and you easily find a provider in Europe
that can host static files. But what about a real web application?

### European alternatives for what exactly?

Let's have a look. In the first row, you see three of the most popular hosting providers out there.
It's Vercel, Cloudflare, and Netlify. And they are arguably much more than just a hosting provider.
But when it comes to hosting what they do have in common, they all follow a serverless model.
Serverless as in serverless functions. And so they're suitable for anything from a solo developer, a
small team, big team, even some big companies use these providers.

But when you use one of these providers, you're making a conscious or sometimes unconscious decision
to be okay with a lock-in with their proprietary serverless model. Many companies do not want to
have that lock-in into a serverless model, so they go with one of the hyperscalers. AWS, the Google
Cloud Platform, or Microsoft Azure. And on these platforms, they have more flexibility in how they
deploy their infrastructure and how they scale it, but they do need in-house DevOps expertise. And
not every company wants to build that DevOps expertise.

### Why do web developers love Vercel & Co.?

Why are Vercel Cloudflare and Netlify so popular? It's basically two factors. The first one, they
manage to abstract away servers and scaling. Servers and scaling is a really hard problem, and it's
something you don't want to deal with if you don't have to. So if somebody takes it out of your
hands and does it for you, it's very attractive.

And then not only that, but they also build a fantastic developer experience around this. Especially
Vercel is really good at everything just works, everything is polished. So you do get an absolutely
friction free developer experience. As a consequence, when you have that, the initial hurdle to work
on an app and to deploy it is very low. So you can go from idea to production very fast.

And on top of that, it's batteries included. If you need a firewall, if you need caching, if you
need SSL managed automatically, it's all done for you, it's all abstracted away as much as possible,
and it's all friction free. But as I mentioned already, these benefits all come at a very high cost,
and that is vendor lock-in.

### European serverless functions

I was asking myself two questions. Do European serverless functions even exist? Because I never came
across a serverless function offering in the wild. And if they exist, do they create less lock-in or
no lock-in in comparison with Big Tech serverless functions?

And I found one provider. Provider is from France, it's called Scaleway. And they are primarily a
reseller of raw compute. But they do have a serverless functions offering. And on their website,
they do have a nice diagram, so let's have a look.

Now this is the marketing website. If you scroll down, you'll see this diagram. And we can see on
this diagram that when there is an incoming request, it goes to a package called Knative that runs
on Kubernetes. It's also open source and kind of standardized.

And then that package pulls from a container registry a little container that is then being deployed
as a pod. And that little container contains everything that you need to run your serverless
function, and then it will run the serverless function. And then to get your code into production,
you need to use their API. And then that API will access a package called Tekton, which is used to
package the serverless functions, put them in a registry.

So Scaleway uses Kubernetes, which is nice open source, standardized, and a few more packages to
build their serverless functions offering, but you still have to use a proprietary API, and that's
why also with Scaleway serverless functions, you would just like with Big Tech serverless functions
create a lock-in.

### Lock-in and Docker containers

Now the question is, is there anything we can do about the lock-in?

When we talk about how to prevent getting locked into our hosting provider, we have to talk about
Docker containers. But first we have to let go of the idea that serverless functions are the best
way or the only way to get our application into production.

They're one way and they're very good way in many ways, as we've discussed before. But we can also
package our application into Docker containers and put the Docker containers into production. And
that immediately eliminates the vendor lock-in because we have so many more options to host our
applications.

And Docker containers are nothing new, they're battle tested, they have been used by large
organizations for many years. So there is not much risk in terms of adopting Docker containers. And
they bring European hosting providers back into the equation.

### Reference: Railway

Let's talk about Railway, which I consider to be a really good reference for polished Docker
hosting.

Railway is in my opinion not Big Tech. They used to build their services on I believe Google Cloud
data centers, but they meanwhile have moved away, so they're running their own hardware in different
data centers in the world. They're still American, but they're also a very good reference of how to
do things right. So let's look at why that is the case.

So Railway is suitable for solo devs, for small teams, big teams. Even for teams with DevOps, I
would say it's a good option. You can bring your own Docker image, or you can let Railway build your
Docker image with a tool that they call Railpack. And this is really important because you can start
using Railway and completely ignore that it's using Docker under the hood, because they can
containerize the application for you. But you can then later on when you're more confident, you can
opt in to add your own Docker image, and then Railway uses that image to deploy your app.

Railway has a feature which is auto vertical scaling. And before I go into the details, let me
quickly explain what is vertical scaling versus horizontal scaling. So if you have a virtual machine
that has let's say one CPU and it has one gig of RAM, and you want to increase the specs on the fly
because your load on your server has increased, then you can bump that to two CPUs and two gig of
RAM. And that is called vertical scaling. So you beef up the specs of your server. And then
horizontal scaling means you add additional servers to your setup. And those servers can be in the
same region or in different regions.

Now with Railway, you can do auto vertical scaling up to a maximum spec that you can that you can
define. And that's important because I find it really hard as a developer when I want to bring my
application into production to figure out how much RAM does it need. How many CPUs does it need?
Because I have no idea will this be just like a small traffic website, or will this maybe uh go
viral and have a lot of traffic?

And with auto vertical scaling, Railway takes that burden away from you because they will figure it
out for you what specs you need on your virtual machine. And then they also have horizontal scaling,
so you can add servers in the same or in different locations. And then they add automatic load
balancing, so it's very easy to set that up.

Railway also has a really great developer experience, so they have GitHub integration, which means
you can push to deploy, or you can use their own CLI. And DX, I would say stands for both for
developer experience and DevOps experience.

And then as if all of that is not enough, they do have a pay as you go model. So you pay for what
you actually consume. If you have a server that once a day gets a request, then you can configure
that in a way that it will sleep most of the time. Once a day when it gets the request, it wakes up,
and you pay only for what you use there. So it costs you next to nothing. And with this pay as you
go model, it's impossible to over spec or under spec your server because Railway will always right
spec it for you.

So in this video, I take Railway as the reference point for really good Docker hosting. So any
European alternative will be measured against Railway.

### Docker hosting at scale

Let's talk about Docker hosting at scale. In the introduction to this video, I talked about
companies preferring to use hyperscalers to host their infrastructure and to host their workloads.
And AWS, the Google Cloud Platform, and Azure, they all have their proprietary approach to scaling
applications. But there's also a more standardized way, so you can use Kubernetes as a standardized
method to scale your applications.

And a Kubernetes workflow works roughly like this. You create a Docker file for each service that
you want to deploy it as part of your application. You push images to private container registries.
You write a Kubernetes manifest. So you tell Kubernetes where to get the images from then you deploy
all of that to a Kubernetes cluster that you host with a hosting company or maybe even in-house.

This is, of course, not suitable for solo devs or small team, but it is what many larger
organizations already do. And teams that use Kubernetes will have no issue moving their workloads to
a European provider because it's all super standardized. And so all you have to do is you Google for
European options for Kubernetes for managed Kubernetes cluster, and you'll find options like
STACKIT, OVH, Scaleway, and UpCloud. And then it's relatively easy for you to migrate there.

### Focus on solo devs and small teams

So for the rest of this video, I want to focus on European alternatives for solo devs and for small
teams. Before we continue, I'd like to make a disclaimer. I provide a non exhaustive overview of
hosting options. So there are many options that are out there that I will not cover in this video.
It's not a complete list, but I want to lay out the space of options that you have. Because once you
understand that, you can go ahead and search for your own options.

### Option 1: VPS

Let's look at our first option, a VPS, a virtual private server.

And I need to add for all the options that I'm gonna walk you through in this video, I'll add a
subjective rating for the developer experience. This is not a scientific rating, it's subjective,
but the idea is it gives you an indication of what to expect in terms of developer experience.

You rent a virtual server with more or less permissions from one of the hosting providers. And big
chance that that server is unmanaged, and you have to patch it yourself and update it yourself, and
you won't have any deployment abstractions.

Usually a VPS is being delivered with SSH, maybe FTP or SFTP, but you have to figure out yourself
how you deploy to the server and how you manage your deployments. This is for me the definition of
legacy hosting.

But a VPS has one big advantage. It is cheap and there are plenty of options out there. The best
known option is probably Hetzner. There's also an option called Centron from Germany, Netcup from
Germany, and OVHcloud. But you know there are probably hundreds of options out there where you can
rent a bare VPS.

But you can try to improve this with our next option.

### Option 2: VPS with Coolify

It has gained some traction for self hosting over the last year. It was also pushed in the Syntax
podcast. But I still consider it to be a band-aid. It's a band-aid that you apply to VPS to make
your experience better. And you see also with my subjective DX rating, I give it three stars. So
let's look into this option.

So Coolify adds a Railway-like deployment abstraction. It containerizes the applications and runs
Docker with them. So that is very similar to what Railway is doing. And you get on top some
developer experience goodness. You can deploy from GitHub, you can do a push to deploy. And it
supports preview deployments.

It's self hosted on the VPS that you have to rent. And then it's also completely for free. Or you
can use Coolify's cloud option, that's a paid solution where they host it for you and they maintain
it for you. And my recommendation is if you go with this option, then use a managed server, or you
have to really diligently patch your server and especially Docker. That's also being used. Coolify
can be used with pretty much any VPS provider, European or not. And that opens the door to a lot of
options.

Before we move on, I want to mention that scaling is a pain point with Coolify. And also there is a
Coolify alternative. It's called Dokploy. I just want to mention it for the sake of completeness.

And then for me personally, having to nanny a VPS and having to patch it and update it is a little
bit like owning a puppy. It's not something I want to go for because I feel more comfortable
deploying my applications one or two levels higher.

### Option 3: Sliplane

Let's look at our next option. It's called Sliplane from Germany. And it's Docker hosting on a
managed server. You can think of Sliplane as a managed VPS plus Coolify. And you get some of the
Coolify features, not all.

For example, you get GitHub integration for deployment, so you can do a push to deploy. But Sliplane
does not containerize the applications for you. So you have to figure out how to create your Docker
containers and how to put them in a registry so that Sliplane can pull them from there and deploy
them.

And that's also the reason why I give this solution only three stars in terms of developer
experience, because yes, you gain a managed VPS, but you lose the containerization, which is a big
deal. That's why I think it's on par with the previous one. But it has the difference of managed
versus containerization.

You do get manual vertical scaling, you get no horizontal scaling, and the pricing is a fixed price
for a managed virtual or dedicated Hetzner server. So they have to pay a certain price, and you can
you can look that up on the Hetzner website what that will be, maybe a little bit less. But then
they have to add something on top to make a profit and to charge for their platform.

But it's uh it's a bummer that they don't have the containerization, they don't create the uh the
containers for you. But overall, I think this looks like a pretty good option that you should keep
an eye on.

### Option 4: Upsun

So now we climb up the abstraction ladder one step. And we're now looking at a PaaS, a platform as a
service. It's called Upsun from France. And a PaaS abstracts away the containers because you now
think in terms of applications. Your abstraction level is applications and not containers.

Under the hood, they use a composable image, which is built on Nix and composable just means it's
for them, it's flexible, so depending on what application you host, they can pull in the different
dependencies and then quickly spin that up.

They do have horizontal auto-scaling for applications, and you get a lot of DX goodness. For
example, deploy from GitHub, preview environments.

If you look at their pricing, um it's they're very expensive, and they seem to be targeting
enterprise customers only, so it's not necessarily an option for small teams or a solo developer.
But overall, I think Upsun has the potential to grow into a European Railway competitor.

But I also want to point out because we're at the abstraction level of a PaaS, of a platform as a
service, there are also more opportunities for them to lock you into their platform.

### Option 5: Clever Cloud

Our next option is similar. It's called Clever Cloud, it's also from France, and it's kind of
striking here that there are a lot of options from France. And they are also a PaaS, but they use a
different abstraction layer.

They use VMs as abstractions and not just containers, because they say then the application is much
better isolated from anything else, which which runs on their platform. So unit of abstractions are
scalers, VMs, not containers.

Other than that, they're very similar to Upsun in terms of scalability, DX, and pricing, so also
means unfortunately they are quite pricey. But I also think they have the potential to grow into a
European Railway competitor. Like before with Upsun, they also come with lock-in risks because it's
PaaS and it's their custom abstraction that they have.

Before we move on, I just want to point out there are even more French options. There's another
option, it's called Scalingo. Uh found another one, it's called Stackhero that's Stackhero.io. And
it's striking that they're all from France, and uh it seems to me almost for any US Big Tech
service, like be it a search engine or AI, there is something French there, is a French equivalent
there. And that's not the case with with uh other European countries. So it's quite impressive that
France is really strategically investing into um kind of new services, and also pushing startups to
have an alternative for uh Big Tech.

### Option 6: Koyeb

So now we go to Koyeb. Um I wrote there “The European Railway competitor?" And Koyeb was really
hyped in my Bluesky feed, so there's like a lot of people that say this is really cool, this is
really good. So I felt I should include this here and look at it. But can they really hold up to the
expectations?

You can build from Git with Koyeb with Buildpacks, which means they um containerize your
application, or you bring your own Docker image, and that also means we're again one level back down
to Docker in terms of abstraction that we're dealing with.

They do have manual vertical scaling only, which is a bummer, and I wanna elaborate on that a bit
more. They have auto-horizontal scaling. And I mentioned it before in conjunction with Railway. I
find it hard as a developer to have to figure out how many how many CPUs should your instance have.
Um how much memory, and to get that right, and then whatever you choose, which may be completely
over-scaled or under-scaled, will just be automatically scaled horizontally, and that's not ideal
because that kind of tends to be wasteful in terms of the resources that you spend. You pay for
resources that you that you don't really need.

But for the horizontal scaling, at least they have feature it is called scale-to-zero. Which means
when you scale horizontally you need to add a minimum number of instances and a maximum number. The
minimum number can be zero, which means if there is no traffic, there are no requests, it will scale
it down to zero, and that will not trigger any costs. So you're a little bit closer to Railway's pay
only for what you use, and I think this is also a a big point, like you want to have the cost
efficiency.

I also noticed that their docs are super polished and they're clear. Um so I think this is an option
that you should keep an eye on. However, I wanted to try them out, and uh I was quite a bit put off
uh by my experience there because the first thing was they they wanted credit card details from me,
so without giving them my payment details, I could not proceed to their dashboard, which is kind of
it's not ideal. It doesn't create a great first impression.

But then once I did that, um there was a little warning message in the dashboard saying I need to
verify my identity, otherwise my account will be canceled. And so I clicked on this and I saw this.
And so I was a little bit shocked because asking me to provide multiple things like a photo of an ID
document, a self scan, and then upload all of that to a US company, that is really a big ask, and to
be honest, it's also a deal breaker for me personally.

### Option 7: Bunny

Let's move on to our next option. You all probably know Bunny. It's broadly speaking Europe's
equivalent of Cloudflare. Although it has much less to offer than Cloudflare, but they just launched
an offering called Magic Docker Containers. And that's an interesting offer, even though you see I
gave it two stars in terms of DX, it's not there yet, but it's also very new, very fresh, and I
think this will develop further down the road.

So with the Magic Docker containers, they deploy Docker containers globally, but based on regional
demand, and they use AI for that. So this is AI-driven horizontal scaling. And to give you an
example, it could be you primarily target customers in Europe, but then you get a spike in Asia
because you're featured on some website. And then Bunny will detect that because it will make the
application available through their global CDN. And when they see they have a lot of requests coming
from one region, they will just spin up a container in that region. And then you could have like a
big fat instance in Europe, and then like a small instance in Asia and another one in the US. And
the horizontal scaling happens all automatically.

They don't offer containerization yet. You have to create your own Dockerfile, and you have to
figure out where to put your Docker image into a registry from which the Magic Docker containers can
be pulled for deployment. And that's also why I gave this only two stars in terms of developer
experience, because there's a lot of room for improvement. Also the GitHub integration is not there
yet. It's via GitHub Actions only, which is a little bit clumsy. This can be done much better.

But they do have auto vertical scaling, and that is a feature which is really really important.
Because I mentioned before when you have no auto-vertical scaling and you have to figure out
yourself what specs your containers should have, and then the horizontal scaling is applied to
whatever you choose, and imagine you over-provision and then you add horizontal scaling, so it just
worsens the over-provisioning.

So that's not that's not ideal. And here you could have a scenario where in the Asian server that I
mentioned before, there is low demand. So you have much smaller specs and a smaller VM is enough to
serve that load, but in Europe you have a beefed up Docker container deployed, and maybe in the US
as well, a beefed up, and then in South America a more limited one. So this really opens the door
for you just pay for what you consume with a geographic component. I think this is really really
cool.

There's also no lock-in as long as you stick with Docker deployments. Bunny of course offers much
more. also have a database offering. But if you start using that, you will be locked in. I do think
they need to move beyond the container registries and add containerization of applications and
ideally also abstract that away. But it's early, so I hope they will improve that. Definitely an
offering that you should keep an eye on.

### Conclusions

Okay, so at this point, I hope you have a good idea of what the options are out there and what you
can expect when you look for European hosting. And it's time to draw a couple of conclusions.

My first conclusion is that European hosting revolves a lot around compute. And I was baffled when I
did my research for this video to see so many hosting companies that all they do is sell VPSs in all
kinds of shapes and sizes, and with nothing on it. It's just like here's a box, uh here you go, you
deal with it, you deal with the updates, you deal with everything.

And I think in 2026, selling just a dedicated or a virtual box is not enough. Like we need
abstraction layers that make the developer experience better. And it looks like a lot of innovation
on how to improve this model is coming from France. Uh that surprised me in a positive way. It seems
that France is going its way to really invest in this and see it as a strategic priority, unlike
other European countries.

So, no, raw compute is not enough.

My second conclusion is that auto vertical scaling is crucial for a great DX, and to hammer my point
home, here's a screenshot of like the dashboard one of the providers that we looked at. And I just
don't feel good when I look at this and I have to make a decision.

Do I want to have 0.1 CPU and 64 megabytes of RAM, or do I want to have one CPU and 384 megabytes of
RAM? It's like I don't want to deal with this. I don't want to think in servers, I don't want to
think in terms of CPUs and memory when I deploy an app. I also don't want to over- or
under-provision servers. And the last thing I want is that my over- or under-provisioned server is
then being horizontally scaled. And I have either something in production that is just not beefy
enough, or I'm completely overpaying for resources that I do not need.

I think companies can do better and they should do better. I want auto-vertical scaling.

So my next conclusion is that Docker is the key to avoid lock-in. We've seen it. Docker is more the
thing that you're exposed to as a developer, and then Kubernetes is to make it scale. Some providers
they have their own way of scaling, and that's not necessarily a bad thing as long as what you
deploy is a Docker container.

But I honestly do not want to see any of this. I want this to be abstracted away, and also the
containerization should happen transparently, and only when I choose to opt in I want to see any of
this, and it is crucial to have it, but when I don't need it, I don't want to see it.

### And the winner is...

And now we come to the most exciting part of this video. The winner of best European hosting option
is: Railway.

Now, Railway was our benchmark. And we compared all the European providers to Railway because
Railway offers a really polished developer and DevOps experience. Unfortunately, none of the options
that I presented feels like it's there yet. So I think there's a lot of great potential that we've
seen, but it's not there yet.

So my recommendation is wait it out with something that does not lock you in, and that gives you a
great developer experience until a European competitor is really ready for prime time. I always
think don't let your developer experience be compromised when you want to get things done. And
that's why I would just recommend wait it out. Railway is a good option.

But keep an eye on Bunny because I think their Magic Containers are really good. And I will also
keep an eye on Koyeb, even though they disappointed me. I hope they see this and I hope that there's
room for improvement to find a balance which gives them the confidence that you know they're
protected against abuse, but which makes it easy to try out the platform because as I said, I read a
lot of good things about it.

And last but not least, if you need a European option today, and if you're not faint of heart, then
you should try out Hetzner and Coolify. It is I think the only viable option that you can deploy
your application on a European server today. You don't have to wait for anything, everything is
there, but it's not for me, as I explained, but I also realize it's very popular, a lot of
developers love it. So try it out if this appeals to you.

Now, that was the state of European hosting alternatives. I hope you enjoyed this video. Like and
subscribe. And check out the show notes with all the links to the providers below. And see you in
the next video.
