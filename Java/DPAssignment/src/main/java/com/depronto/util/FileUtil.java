/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.depronto.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 *
 * @author admin
 */
public class FileUtil {

    public static void addToFile(String fileName, String name, int counter) {
        try (FileWriter myWriter = new FileWriter(fileName, true)) {
            counter = counter + 1;
            myWriter.write(counter + ". " + name + "\n");
            System.out.println(name + " added to file");

        } catch (IOException e) {
            System.out.println("[MainApp] addToFile : An error occurred while writing to file.");
            e.printStackTrace();
        }
    }

    public static List<String> readNames(String fileName) {
        List<String> list = null;

        list = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                list.add(line);
            }
            Collections.sort(list);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public static List<String> readEditNames(String fileName, String userName, String idx) {
        List<String> list = null;

        list = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.trim().startsWith(idx + ".")) {
                    list.add(idx + ". " + userName);
                    continue;
                }
                list.add(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        recreateFile(fileName, list);
        return list;
    }

    private static void recreateFile(String fileName, List<String> list) {
        File f = null;
        boolean bool = false;

        try {
            System.out.println("file name to be deleted");
            System.out.println(System.getProperty("user.dir"));
            System.out.println(fileName);
//            f = new File(fileName);
//            bool = f.delete();
//            System.out.println("File deleted: " + bool);
//            Files.deleteIfExists(Paths.get(fileName));
            Path get = Paths.get(fileName);
//            Files.copy(Paths.get(fileName), Paths.get(fileName), REPLACE_EXISTING);
            Files.delete(get);
            
//             fileToBeInstalled.delete();
            FileWriter writer = new FileWriter(fileName, true);
            for (String str : list) {
                System.out.println("writing " + str);
                writer.write(str + System.lineSeparator());
            }
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
