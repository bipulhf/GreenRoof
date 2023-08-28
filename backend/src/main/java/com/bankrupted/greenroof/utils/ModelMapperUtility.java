package com.bankrupted.greenroof.utils;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
public class ModelMapperUtility<E, V> {
    private ModelMapper modelMapper = new ModelMapper();

    public ResponseEntity<?> modelMap(List<E> modelList, Class className){
        List<V> modelMapList = new ArrayList<>();

        modelList.forEach(model -> {
            modelMapList.add((V) modelMapper.map(model, className));
        });
        return ResponseEntity.ok(modelMapList);
    }

    public ResponseEntity<?> modelMap(E model, Class className) {
        return ResponseEntity.ok(modelMapper.map(model, className));
    }
}
