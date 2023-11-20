import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Task from '../domain/Task';
import taskRepo from '../repo/TaskRepo';
import { CustomErrorModal } from './HomeScreen';

const UpdateScreen = ({ route, navigation }) => {
    const { taskId } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [priority, setPriority] = useState(1);
    const [isDone, setIsDone] = useState(false);

    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    useEffect(() => {
        const existingTask = taskRepo.getById(taskId);

        if (existingTask) {
            setTitle(existingTask.title);
            setDescription(existingTask.description);
            setDueDate(existingTask.dueDate);
            setCreateDate(existingTask.createDate);
            setPriority(existingTask.priority);
            setIsDone(existingTask.isDone);
        }
    }, [taskId]);

    const showErrorModal = (message) => {
        setErrorModalMessage(message);
        setErrorModalVisible(true);
    };

    const handleCloseErrorModal = () => {
        setErrorModalVisible(false);
    };

    const handleUpdateTask = () => {
        const updatedTask = new Task(title, description, dueDate, createDate, priority, isDone);

        if (updatedTask.isValid()) {
            const updatedSuccessfully = taskRepo.update(taskId, updatedTask);

            if (updatedSuccessfully) {
                navigation.navigate('Tasks');
            } else {
                showErrorModal('Failed to update task. Please try again.');
            }
        } else {
            showErrorModal('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Edit Task</Text>
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
                onChangeText={(text) => setPriority(parseInt(text, 10))}
                style={styles.input}
            />
            <Button title="Update Task" onPress={handleUpdateTask} />

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

export default UpdateScreen;
