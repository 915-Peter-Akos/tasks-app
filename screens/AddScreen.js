import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Task from '../domain/Task';
import taskRepo from '../repo/TaskRepo';
import { CustomErrorModal } from './HomeScreen';

const AddScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('1');

    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    const handleAddTask = () => {
        const createDate = new Date().toLocaleDateString();
        const newTask = new Task(title, description, dueDate, createDate, parseInt(priority, 10), false);

        if (newTask.isValid()) {
            const addedSuccessfully = taskRepo.add(newTask);

            if (addedSuccessfully) {
                navigation.navigate('Tasks');
            } else {
                showErrorModal('Failed to add task. Please try again.');
            }
        } else {
            showErrorModal('Please fill in all fields.');
        }
    };

    const showErrorModal = (message) => {
        setErrorModalMessage(message);
        setErrorModalVisible(true);
    };

    const handleCloseErrorModal = () => {
        setErrorModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text>Add New Task</Text>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="DueDate"
                value={dueDate}
                onChangeText={(text) => setDueDate(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Priority"
                value={priority}
                onChangeText={(text) => setPriority(text)}
                style={styles.input}
            />
            <Button title="Add Task" onPress={handleAddTask} />

           
            <CustomErrorModal
                isVisible={isErrorModalVisible}
                message={errorModalMessage}
                onClose={handleCloseErrorModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
});

export default AddScreen;
