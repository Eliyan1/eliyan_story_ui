import UIcomp from '../styles/ui_components.module.css'

export default function StoryContent() {
    return <div>
        <div className={`${UIcomp.storytitle}`}>Title of Adventure</div>
        <div className={`${UIcomp.storytablettitle}`}>Key Points</div>
        <div className={`${UIcomp.storytablet}`}>-Be an example</div>
        <div className={`${UIcomp.storytablet}`}>
            -Structure the core components of a story
        </div>
        <div className={`${UIcomp.storytablettitle}`}>Intro</div><div className={`${UIcomp.storytablet}`}>
            When creating a story, the introduction is by far the most important part to prepare.
            One of the reasons for this is that players will be engaged based on how connected they feel to the story.
            This in turn is dependant on how engaging the components of the story have been so far.
            It doesn't matter if a part of a story is a little less engaging, as long as parts before it were engaging, players will hook on again.
            However, as the intro is at the beginning, there are no parts before it that it can fall back on.
            Luckily there are some basic concepts that make any story engaging: For starters, any story that people are personally invested in
            (usually because their characters are involved) is automatically engaging. There are more, but I'm running out of space. Just know this:
            The intro is the only part that can be prepared in advance without having to take into account the unexpected actions your players take,
            so use your prep time well for it.
        </div>
        <div className={`${UIcomp.storytablettitle}`}>NPC Descriptions</div>
        <div className={`${UIcomp.storytablet}`}> <b><u>John McFiller:</u></b> A guy only made to fill the last line of the example. </div>
    </div>
  }