import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { List, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import taskRepo from '../repo/TaskRepo';

const CustomConfirmationModal = ({ isVisible, onCancel, onConfirm }) => {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Are you sure you want to delete this task?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={styles.confirmButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const CustomErrorModal = ({ isVisible, message, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.okButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([]);
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const fetchData = () => {
        setTasks(taskRepo.getAll());
    };

    useEffect(() => {
        fetchData();
    }, [isFocused]);

    const goToAddScreen = () => {
        navigation.navigate('Add Task');
    };

    const handleItemPress = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    const handleEditPress = (taskId) => {
        navigation.navigate('Update Task', { taskId, fetchData });
    };

    const showDeleteConfirmation = (taskId) => {
        setSelectedTaskId(taskId);
        setDeleteModalVisible(true);
    };

    const handleDeletePress = () => {
        taskRepo.remove(selectedTaskId);
        fetchData();
        setDeleteModalVisible(false);
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const renderTaskItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <View style={[styles.taskHeader, { flexDirection: 'row', alignItems: 'center' }]}>
                <List.Item
                    title={item.title}
                    left={() => <List.Icon icon="arrow-down" />}
                    onPress={() => handleItemPress(item.id)}
                    style={[styles.taskItem, styles.titleContainer, { flex: 1 }]}
                />

                <IconButton
                    icon={() => <Icon name="edit" size={20} color="#555" />}
                    onPress={() => handleEditPress(item.id)}
                    style={styles.iconButton}
                />

                <IconButton
                    icon={() => <Icon name="delete" size={20} color="#555" />}
                    onPress={() => showDeleteConfirmation(item.id)}
                    style={styles.iconButton}
                />
            </View>
    
            {expandedTaskId === item.id && (
                <View style={styles.expandedDetails}>
                    <Text style={styles.detailText}>Description: {item.description}</Text>
                    <Text style={styles.detailText}>Due Date: {item.dueDate}</Text>
                    <Text style={styles.detailText}>Priority: {item.priority}</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderTaskItem}
            />

            <Button title="Add New Task" onPress={goToAddScreen} />

            <CustomConfirmationModal
                isVisible={isDeleteModalVisible}
                onCancel={handleCancelDelete}
                onConfirm={handleDeletePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    taskContainer: {
        marginBottom: 10,
    },
    taskHeader: {
        display: 'flex',
    },
    taskItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    expandedDetails: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cancelButton: {
        color: 'blue',
        fontSize: 16,
    },
    confirmButton: {
        color: 'red',
        fontSize: 16,
    },
});

export default HomeScreen;
export { CustomErrorModal };