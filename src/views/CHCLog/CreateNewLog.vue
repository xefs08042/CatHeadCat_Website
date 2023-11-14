<template>
    <div class="form-box">
        <el-form :model="form" ref="resetFormData" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Date" prop="date">
                        <el-date-picker
                        v-model="form.date"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                        />
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col> -->
                <el-col :span="12">
                    <el-form-item label="Time" prop="time">
                        <el-time-picker
                        v-model="form.time"
                        placeholder="Pick a time"
                        style="width: 100%"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Theme" prop="theme">
                <el-input v-model="form.theme" />
            </el-form-item>
            <el-form-item label="Tag" prop="tags">
                <div>
                    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"/>
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        + New Tag
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="Content" prop="content">
                <el-input v-model="form.content" type="textarea" :rows="4"/>
            </el-form-item>
            <el-form-item label="Picture" prop="file">
                <div>
                    <el-upload 
                        v-model:file-list="fileList" 
                        action="action"
                        list-type="picture-card" 
                        :limit="9"
                        :multiple="true"
                        :show-file-list="true"
                        :on-preview="handlePictureCardPreview" 
                        :on-remove="handleRemove" 
                        :http-request="handleUpload"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </div>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="reset_log_info">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { reactive, nextTick, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElInput, ElNotification, UploadProps, UploadUserFile } from 'element-plus'
import { toRaw } from '@vue/reactivity'     // toRaw(Proxy) 将Proxy对象转为一般格式

//Tag组件功能
const inputValue = ref('')
const dynamicTags = ref([
    // 此列表可用 字符串格式 添加tag名称
])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

//上传图片组件功能
const fileList = ref<UploadUserFile[]>([
    // 此列表可用 字典格式 例：{name:'', url:''} 添加照片信息
])
var files = ref([]);

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 重写文件上传方法
const handleUpload = async(param) => {
    files.value.push(param.file);
    console.log(files.value);
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  files.value = []
  uploadFiles.forEach(file => {
    files.value.push(toRaw(file)['raw'])
  }) 
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

//表单组件功能 do not use same name with ref
const resetFormData = ref()
const form = reactive({
  theme: '',
  date: '',
  time: '',
  tags: dynamicTags,
  content: '',
  file: fileList
})

const onSubmit = async() => {
    let formData = new FormData();
    formData.append("theme", form.theme);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("content", form.content);
    dynamicTags.value.forEach(tag => {
        formData.append("tags", tag)
    });
    files.value.forEach(file => {
        formData.append("file", file);
    });
    axios.post("/api/upload/log_info/", formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(res => {
        // do something with res
        console.log(form);
        ElNotification({
            title: 'Success',
            message: 'upload life_log success',
            type: 'success'
        });
        console.log('submit!');
        console.log(res.data);
    }).catch(err => {
        // do something with err
    });
}

function reset_log_info() {
    resetFormData.value.resetFields();
    console.log(form);
    files = ref([]);
}
</script>

<style lang="scss" scoped>
.form-box {
    padding: 20px;
}

.text-center {
    text-align: center;
}

.el-tag {
    margin: 0 5px;
}

.button-new-tag {
    margin: 0 5px;
}
</style>