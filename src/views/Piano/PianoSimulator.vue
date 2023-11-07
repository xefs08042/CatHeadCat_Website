<template>
    <div class="setting_form">
        <el-form :model="form" label-width="120px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="Key">
                        <el-input v-model="form.key" />
                    </el-form-item>

                    <el-form-item label="Pitch">
                        <el-cascader
                            v-model="form.pitch"
                            :options="options"
                            :props="props"
                            @change="handleChange"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="padding-left: 20px; text-align: left;">
                    <el-button plain style="margin-bottom: 18px;">Submit</el-button><br>
                    <el-button plain >Submit</el-button>
                </el-col>
                <el-col :span="12" style="padding-right: 20px; text-align: right;">
                    <el-button plain>Damper Pedal</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <el-card>
        <div class="keyboard" style="text-align: center;">
            <div v-for="(value, key) in keyboard" style="display: flex; justify-content: center; align-items: center;">
                <div v-for="char in keyboard[key]" class="keyboard_key">{{ char }}</div>
            </div>
        </div>
    </el-card>
    <el-card>
    <div class="piano_key_group">
        <div class="key_groups_white">
            <div v-for="group in pitch_groups" class="key_group_white">
                <div v-for="roll_call in roll_calls_white" class="white_key" :pitch="roll_call + group" @click="showPitch($event)">
                    <div style="height: 360px; pointer-events: none;"></div>
                    {{ roll_call + group }}
                </div>
            </div>
            <div class="white_key" @click="showPitch_C8"><div style="height: 360px" @click="showPitch_C8"></div><h4>C8</h4></div>
        </div>
        <div class="key_groups_black">
            <div v-for="group in pitch_groups" class="key_group_black">
                <div v-for="black in roll_calls_black" class="black_key" :style="black.margin" :pitch="black.roll_call + group" @click="showPitch($event)">
                    <div style="height: 180px; pointer-events: none;"></div>
                    {{ black.roll_call + group }}
                </div>
            </div>
        </div>
    </div>
    </el-card>
</template>

<script lang="ts" setup>
import * as Tone from 'tone'
import { ref, reactive } from 'vue'

const keyboard = {
    'line_0': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '-', '+'],
    'line_1': ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
    'line_2': ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'],
    'line_3': ['~', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Back']
}
const pitch_groups = [1, 2, 3, 4, 5, 6, 7]
const roll_calls = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const roll_calls_white = ["C", "D", "E", "F", "G", "A", "B"]
const roll_calls_black = [
        {"roll_call": "C#", "margin": "margin-left: 51px"},
        {"roll_call": "D#", "margin": "margin-left: 11px"},
        {"roll_call": "F#", "margin": "margin-left: 51px"},
        {"roll_call": "G#", "margin": "margin-left: 11px"},
        {"roll_call": "A#", "margin": "margin-left: 10px"},
    ]

const form = reactive({
  key: '',
  pitch: '',
})
const value = ref([])
const props = {
  expandTrigger: 'hover' as const,
}
const handleChange = (value) => {
  console.log(value);
}
const options = [];
for (let i in roll_calls) {
    const item = {value: roll_calls[i], label: roll_calls[i]}
    const children = []
    for (let j in pitch_groups) {
        const child = {value: roll_calls[i] + pitch_groups[j], label: roll_calls[i] + pitch_groups[j]}
        children.push(child)
    }
    item['children'] = children
    options.push(item)
}

let piano_sampler = {}
for (let i in roll_calls_white) {
    for (let j in pitch_groups) {
        const pitch = roll_calls_white[i] + pitch_groups[j];
        piano_sampler[pitch] = pitch + '.mp3';
    };
};
for (let i in roll_calls_black) {
    for (let j in pitch_groups) {
        const pitch = roll_calls_black[i].roll_call + pitch_groups[j];
        piano_sampler[pitch] = pitch + '.mp3';
    };
};
console.log(piano_sampler);
Tone.start();
const piano = new Tone.Sampler(piano_sampler, {
    release: 1,
    baseUrl: '/src/assets/Piano_88keys/'
})
// 创建音频效果
const reverb = new Tone.Reverb().toDestination(); // 添加混响效果
const eq = new Tone.EQ3().toDestination(); // 添加均衡器效果

// 将音频效果连接到钢琴采样器
piano.connect(eq);
eq.connect(reverb);


const showPitch = (e) => {
    const pitch = e.target.getAttribute('pitch')
    console.log(pitch);
    piano.triggerAttackRelease(pitch, "4n");
}
const showPitch_C8 = () => {
    piano.triggerAttackRelease("C8", "4n");
}

document.addEventListener("keydown", function(e) {
    const keyCode_to_pitch = {
        65: 'C4', 66: 'D4', 67: 'E4', 68: 'F4', 69: 'G4', 70: 'A4', 71: 'B4'
    }
    console.log("您按下的按钮的keyCode为：" + e.keyCode);
    const keyCode = e.keyCode;
    piano.triggerAttackRelease(keyCode_to_pitch[e.keyCode], "4n");
})
</script>

<style lang="scss" scoped>
.keyboard_key {
    margin: 10px; 
    width: 50px; 
    height: 50px; 
    text-align: center; 
    line-height: 50px; 
    border: 1px solid #95a5a6; 
    border-radius: 10%;
    transition: .1s;
}
.keyboard_key:hover {
    color: #fff;
    background-color: #3498db;
}
.piano_key_group {
    position: relative;
    margin: 20px 0;
    width: 100%;
    height: 420px;
    overflow: auto;
    user-select:none;
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
    pointer-events: none;
}
.key_group_black {
    display: flex;
    pointer-events: none;
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
    pointer-events: all;
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