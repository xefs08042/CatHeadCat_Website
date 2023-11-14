<template>
    <div class="setting_form">
        <el-collapse v-model="activeNames" @change="setting_form_handleChange">
            <el-collapse-item title="Setting Form" name="1">
                <el-form :model="form" label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="Key">
                                <el-input v-model="form.key" disabled/>
                            </el-form-item>
                            <el-form-item label="Current Pitch">
                                <el-input v-model="form.current_pitch" disabled/>
                            </el-form-item>
                            <el-form-item label="Modified Pitch">
                                <el-cascader v-model="form.modified_pitch" :options="options" :props="props" :show-all-levels="false" @change="handleChange"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button plain type="primary" @click="modify_key_pitch">Submit</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="padding-right: 20px; text-align: right;">
                            <el-button plain @click="test">Damper Pedal</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="PC KeyBoard" name="2">
                <el-card>
                    <div class="keyboard" style="text-align: center;">
                        <div v-for="(value, key) in keyboard" style="display: flex; justify-content: center; align-items: center;">
                            <div v-for="char in keyboard[key]" class="keyboard_key" @click="keyboard_click">
                                <p style="font-weight: 600; font-size: medium;" :key_char="char">{{ char }}</p>
                                <p :key_char="char" :v-model="key_pitch[char]">{{  key_pitch[char] }}</p>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-collapse-item>
            <el-collapse-item title="Piano KeyBoard" name="3">
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
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script lang="ts" setup>
import * as Tone from 'tone'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'

// PC键盘按键与布局
var keyboard = {
    'line_0': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+'],
    'line_1': ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
    'line_2': ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|'],
    'line_3': ['~', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Back']
}
// PC键盘键名与音高的映射表
const key_pitch = reactive({
    '1': 'D#2', '2': 'F#2', '3': 'G#2', '4': 'A2', '5': 'A#2', '6': 'B2', '7': 'C#5', '8': 'D#5', '9': 'F#5', '0': 'G#5', '-': 'A5', '+': 'A#5',
    'Q': 'C2', 'W': 'D2', 'E': 'E2', 'R': 'F2', 'T': 'G2', 'Y': 'A#3', 'U': 'C5', 'I': 'D5', 'O': 'E5', 'P': 'F5', '{': 'G5', '}': 'A#4',
    'A': 'C#3', 'S': 'D#3', 'D': 'F#3', 'F': 'G#3', 'G': 'A3', 'H': 'B3', 'J': 'C#4', 'K': 'D#4', 'L': 'F#4', ':': 'G#4', '"': 'A4', '|': 'B4',
    '~': 'C#2', 'Z': 'C3', 'X': 'D3', 'C': 'E3', 'V': 'F3', 'B': 'G3', 'N': 'C4', 'M': 'D4', '<': 'E4', '>': 'F4', '?': 'G4', 'Back': 'B5'
})
// PC键盘按键名称与键码的映射表
const keyCode_to_char = {
    65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 
    78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z',
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
    189: '-', 187: '+', 192: '~', 8: 'Back', 219: '{', 221: '}', 220: '|', 186: ':', 222: '"', 188: '<', 190: '>', 191: '?'
}

// 钢琴键盘按键与布局
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

// 折叠面板初始化，默认展开3（即钢琴键盘）
const activeNames = ref(['3'])
const setting_form_handleChange = (val: string[]) => {
  console.log(val)
}

// 设置栏表单——用于修改PC键盘按键对应音高
const form = reactive({
  key: '',
  current_pitch: '',
  modified_pitch: ''
});

// 级联选择器相关声明
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
};

// 修改按键音高的表单提交事件
const modify_key_pitch = () => {
    if (form.key == '' || form.current_pitch == '' || form.modified_pitch == '') {
        ElNotification({
            title: 'Warning',
            message: 'please input essential info',
            type: 'warning'
        });
    } else {
        key_pitch[form.key] = form.modified_pitch[1];
        form.current_pitch = key_pitch[form.key];
        form.modified_pitch = '';
        ElNotification({
            title: 'Success',
            message: 'modified key_pitch success',
            type: 'success'
        });
        console.log(key_pitch[form.key]);
    }
};

// 钢琴音频采样，关联音高与对应静态音频资源
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
Tone.start();
// 模拟钢琴，设置相关参数
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

// 钢琴键盘的按键点击事件
const showPitch = (e) => {
    const pitch = e.target.getAttribute('pitch')
    console.log(pitch);
    piano.triggerAttackRelease(pitch, "4n");
}
const showPitch_C8 = () => {
    piano.triggerAttackRelease("C8", "4n");
}

// PC键盘的按键点击事件
const keyboard_click = (e) => {
    form.key = e.target.getAttribute('key_char');
    form.current_pitch = key_pitch[form.key];
    piano.triggerAttackRelease(key_pitch[form.key], "4n");
}

// PC键盘的监听
document.addEventListener("keydown", function(e) {
    console.log("您按下的按钮的keyCode为：" + e.keyCode);
    if (Object.keys(keyCode_to_char).includes(e.keyCode.toString())) {
        console.log('key in list');
        piano.triggerAttackRelease(key_pitch[keyCode_to_char[e.keyCode]], "4n");
    };
})

const test = () => {
    console.log('test');
    keyboard['line_5'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+'];
    console.log(keyboard);
    console.log('test');
}
</script>

<style lang="scss" scoped>
.setting_form {
    user-select: none;
}
.keyboard_key {
    margin: 10px; 
    width: 50px; 
    height: 50px; 
    text-align: center; 
    line-height: 25px; 
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