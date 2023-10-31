<template>
    <div class="piano_key_group">
        <div class="key_groups_white">
            <div v-for="group in pitch_groups" class="key_group_white">
                <div v-for="roll_call in roll_calls_white" class="white_key" :pitch="roll_call + group" @click="showPitch($event)">
                    <div style="height: 360px"></div>
                    {{ roll_call + group }}
                </div>
            </div>
            <div class="white_key"><div style="height: 360px"></div><h4>C8</h4></div>
        </div>
        <div class="key_groups_black">
            <div v-for="group in pitch_groups" class="key_group_black">
                <div v-for="black in roll_calls_black" class="black_key" :style="black.margin" :pitch="black.roll_call + group" @click="showPitch($event)">
                    <div style="height: 180px"></div>
                    {{ black.roll_call + group }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();
const roll_calls_white = ["C", "D", "E", "F", "G", "A", "B"]
const pitch_groups = [1, 2, 3, 4, 5, 6, 7]
const roll_calls_black = [
        {"roll_call": "C#", "margin": "margin-left: 51px"},
        {"roll_call": "D#", "margin": "margin-left: 11px"},
        {"roll_call": "F#", "margin": "margin-left: 51px"},
        {"roll_call": "G#", "margin": "margin-left: 11px"},
        {"roll_call": "A#", "margin": "margin-left: 10px"},
    ]
const showPitch = (e) => {
    const pitch = e.target.getAttribute('pitch')
    console.log(pitch);
    synth.triggerAttackRelease(pitch, "8n");
}
</script>

<style lang="scss" scoped>
.piano_key_group {
    position: relative;
    margin: 20px 0;
    width: 100%;
    height: 420px;
    overflow: auto;
}
.key_groups_white {
    display: flex;
    position: absolute;
    z-index: 1;
}
.key_group_white {
    display: flex;
}
.key_groups_black {
    display: flex;
    position: absolute;
    left: -25px;
    z-index: 10;
}
.key_group_black {
    display: flex;
}
.white_key {
    position: relative;
    height: 400px;
    width: 40px;
    background-color: white; 
    border: 1px solid  #ecf0f1;
    border-radius: 5px;
    text-align: center;
    color: black;
    font-size: 12px;
    font-weight: bold;
    transition: .1s;
}
.white_key:hover {
    background-color: #3498db;
}
.black_key {
    height: 240px;
    width: 30px;
    background-color: rgb(11, 8, 8); 
    border: 1px solid  #95a5a6;
    border-radius: 5px;
    text-align: center;
    color: white;
    font-size: 12px;
    font-weight: bold;
    transition: .1s;
}
.black_key:hover {
    background-color: #c0392b;
}
.key_pitch_text {
    z-index: 20;
}

/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px; 
}
/**滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
</style>